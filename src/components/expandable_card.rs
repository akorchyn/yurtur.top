use dioxus::prelude::*;
use dioxus_markdown::Markdown;
use web_sys::DomRect;

#[derive(Props, PartialEq)]
pub struct ExpandableCardProps {
    id: String,
    type_: String,
    right_top: String,
    header: String,
    description: String,
    markdown_details: String,
    tags: String,
}

fn is_card_visible(element: &DomRect, inner_height: f64) -> bool {
    let top = element.top();
    let bottom = element.bottom();

    top > 0.0 && bottom < inner_height
}

pub fn ExpandableCard(cx: Scope<ExpandableCardProps>) -> Element {
    let visible = use_state(cx, || false);
    let is_inited = use_state(cx, || false);
    let element = cx.props;

    // Use an effect to reset the scroll when the card is closed
    use_effect(cx, (visible, &element.id), |(visible, id)| {
        to_owned![visible, id, is_inited];
        async move {
            if !*is_inited.get() {
                is_inited.set(true);
                return;
            }
            if !*visible {
                // Use web_sys to get the document and reset the scroll position
                if let Some(window) = web_sys::window() {
                    if let (Some(document), Some(scroll_y), Some(inner_height)) = (
                        window.document(),
                        window.scroll_y().ok(),
                        window.inner_height().ok(),
                    ) {
                        if let (Some(element), Some(inner_height)) =
                            (document.get_element_by_id(&id), inner_height.as_f64())
                        {
                            let rect: web_sys::DomRect = element.get_bounding_client_rect();

                            if !is_card_visible(&rect, inner_height) {
                                let y = rect.top() + scroll_y - 100.0;
                                window.scroll_with_scroll_to_options(
                                    web_sys::ScrollToOptions::new()
                                        .top(y)
                                        .behavior(web_sys::ScrollBehavior::Smooth),
                                );
                            }
                        }
                    }
                }
            }
        }
    });

    let render_part = if *visible.get() {
        rsx!(div {
            Markdown {
                class: "prose prose-sm prose-slate prose-headings:text-sm prose-headings:font-bold prose-headings:text-slate-500 py-2",
                content: element.markdown_details.as_str()
            }
        })
    } else {
        rsx!(div {
            div {
                class: "text-slate-500 font-bold py-2",
                element.header.as_str()
            },
            div {
                class: "text-slate-500 text-sm",
                element.description.as_str()
            }
        })
    };

    let read_less_or_more = if *visible.get() {
        "Read less"
    } else {
        "Read more"
    };

    let class = if *visible.get() {
        "relative w-[calc(100%-2rem)] max-w-xl group bg-white p-4 rounded border transition-all duration-1000 transform cursor-pointer shadow-lg  shadow-lg duration-1000 shadow-black/30 ease-in-out expanded scale-100"
    } else {
        "relative w-[calc(100%-2rem)] max-w-xl group bg-white p-4 rounded border shadow-none transition-all duration-1000 transform cursor-pointer duration-1000 ease-in-out hover:shadow-lg hover:shadow-black/30 scale-90"
    };

    let card = rsx!(div {
        id: element.id.as_str(),
        onclick:  move |_| visible.set(!*visible.get()),
        div {
            class: class,
            div {
                class: "flex items-center justify-between text-xs text-main",
                div {
                    element.type_.as_str()
                }
                time {
                    element.right_top.as_str()
                }
            }
            render_part
            div {
                class: "flex flex-wrap justify-start text-xs py-2 text-third",
                element.tags.as_str()
            }
            div {
                class: "flex justify-end text-sm text-main group-hover:underline",
                read_less_or_more
            }
        }
    });

    cx.render(card)
}

use std::str::FromStr;

use dioxus::prelude::*;
use dioxus_markdown::Markdown;
use web_sys::DomRect;

use crate::components::tag::Tag;

#[derive(Props, Clone, PartialEq)]
pub struct ExpandableCardProps {
    id: String,
    type_: String,
    right_top: String,
    header: String,
    description: String,
    markdown_details: String,
    tags: String,
}

fn is_card_visible(props: &DomRect, inner_height: f64) -> bool {
    let top = props.top();
    let bottom = props.bottom();

    top > 0.0 && bottom < inner_height
}

pub fn ExpandableCard(props: ExpandableCardProps) -> Element {
    let mut visible = use_signal(|| None::<bool>);
    let mut is_inited = use_signal(|| false);

    let mut tags: Vec<String> = props
        .tags
        .split_whitespace()
        .map(|tag| String::from_str(tag).unwrap())
        .collect();
    tags.sort();
    let tags = tags.into_iter().map(|tag| rsx!(
        Tag { text: tag }
    ));

    // Use an effect to reset the scroll when the card is closed
    let id = props.id.clone();
    use_effect(use_reactive!(|(visible, id)| {
        if !*is_inited.read() {
            *is_inited.write() = true;
            return;
        }
        if let Some(false) = *visible.read() {
            // Use web_sys to get the document and reset the scroll position
            if let Some(window) = web_sys::window() {
                if let (Some(document), Some(scroll_y), Some(inner_height)) = (
                    window.document(),
                    window.scroll_y().ok(),
                    window.inner_height().ok(),
                ) {
                    if let (Some(props), Some(inner_height)) =
                        (document.get_element_by_id(&id), inner_height.as_f64())
                    {
                        let rect: web_sys::DomRect = props.get_bounding_client_rect();

                        if !is_card_visible(&rect, inner_height) {
                            let y = rect.top() + scroll_y - 100.0;
                            let options = web_sys::ScrollToOptions::new();
                            options.set_top(y);
                            options.set_behavior(web_sys::ScrollBehavior::Smooth);
                            window.scroll_with_scroll_to_options(&options);
                        }
                    }
                }
            }
        }
    }));

    let visible_value = visible.read().unwrap_or_default();
    let render_part = if visible_value {
        rsx!(
            div {
                class: "prose prose-sm prose-slate prose-a:text-main prose-headings:text-sm prose-headings:font-bold prose-headings:text-slate-500 py-2",
                onclick: move |_| {},

                Markdown { content: props.markdown_details }
            }
        )
    } else {
        rsx!(
            div {
                div { class: "text-slate-500 font-bold py-2", {props.header} }
                div { class: "text-slate-500 text-sm", {props.description} }
            }
        )
    };

    let read_less_or_more = if visible_value {
        "Read less"
    } else {
        "Read more"
    };

    let class = if visible_value {
        "shadow-lg scale-100"
    } else {
        "shadow-none hover:shadow-lg scale-90"
    };

    rsx!(
        div {
            id: props.id,
            onclick: move |_| *visible.write() = Some(!visible_value),
            class: "relative z-10 w-[calc(100%-2rem)] max-w-xl group bg-white p-4 shadow-black/30 rounded border transition-all duration-1000 transform cursor-pointer ease-in-out scale-100 {class}",
            div { class: "flex items-center justify-between text-xs text-main",
                div { {props.type_} }
                time { {props.right_top} }
            }
            {render_part},
            div { class: "flex flex-wrap justify-start text-xs py-2 gap-y-1", {tags} }
            div { class: "flex justify-end text-sm text-main group-hover:underline",
                {read_less_or_more}
            }
        }
    )
}

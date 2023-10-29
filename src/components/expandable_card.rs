use dioxus::prelude::*;

#[derive(Props, PartialEq)]
pub struct ExpandableCardProps {
    type_: String,
    right_top: String,
    header: String,
    description: String,
    details: String,
}

pub fn ExpandableCard(cx: Scope<ExpandableCardProps>) -> Element {
    let visible = use_state(cx, || false);
    let element = cx.props;

    let render_part = if *visible.get() {
        rsx!(div {
            div {
                class: "text-slate-500 text-sm",
                element.details.as_str()
            }
            div {
                class: "flex justify-end text-sm text-main group-hover:underline",
                "Read less"
            }
        })
    } else {
        rsx!(div {
            div {
                class: "text-slate-500 text-sm",
                element.description.as_str()
            }
            div {
                class: "flex justify-end text-sm text-main group-hover:underline",
                "Read more"
            }
        })
    };

    let class = if *visible.get() {
        "relative group bg-white p-4 rounded border shadow-none transition-all duration-500 transform cursor-pointer scale-110"
    } else {
        "relative group bg-white p-4 rounded border shadow-none transition-all duration-500 transform cursor-pointer scale-100"
    };

    let card = rsx!(div {
        onclick: |_| visible.set(!*visible.get()),
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
            div {
                class: "text-slate-500 font-bold",
                element.header.as_str()
            },

            render_part,
        }
    });

    cx.render(card)
}

use dioxus::prelude::*;

#[derive(Props)]
pub struct PopOverProps<'a> {
    title: &'a str,
    text: &'a str,
    children: Element<'a>,
}

pub fn PopOver<'a>(cx: Scope<'a, PopOverProps<'a>>) -> Element {
    let visible = use_state(cx, || false);

    let pop_over = rsx!(div {
        class: "absolute z-10 w-96 p-2 mt-2 bg-white border border-gray-200 rounded shadow-xl",
        h1 {
            class: "text-sm text-gray-700 font-bold mb-2",
            cx.props.title
        }
        p {
            class: "text-sm text-gray-500",
            cx.props.text
        }
    });

    cx.render(rsx! {
        div {
            class: "relative w-fit",
            onmouseenter: |_| visible.set(true),
            onpointerenter: |_| visible.set(true),
            onpointerleave: |_| visible.set(false),
            onmouseleave: |_| visible.set(false),
            &cx.props.children,
            if *visible.get() {
                pop_over
            }
        }
    })
}

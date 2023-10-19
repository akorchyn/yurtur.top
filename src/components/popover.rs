use dioxus::prelude::*;

#[derive(Props)]
pub struct PopOverProps<'a> {
    title: &'a str,
    text: &'a str,
    class: &'a str,
    children: Element<'a>,
}

pub fn PopOver<'a>(cx: Scope<'a, PopOverProps<'a>>) -> Element {
    let visible = use_state(cx, || false);

    let pop_over = rsx!(div {
        class: "absolute min-w-32 md:min-w-96 z-10 w-full p-2 top-full left-0 translate-y-0 bg-white border border-gray-200 rounded shadow-xl",
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
            class: cx.props.class,
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

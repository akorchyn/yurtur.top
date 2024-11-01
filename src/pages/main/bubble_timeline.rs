use dioxus::prelude::*;

#[derive(Clone, Props, PartialEq)]
struct TimelineBubbleProps {
    year: String,
    title: String,
    description: String,
    icon: String,
}

fn TimelineBubble(props: TimelineBubbleProps) -> Element {
    let mut is_popped = use_signal(|| false);
    let (class1, class2, class3) = if *is_popped.read() {
        ("scale-110", "bg-main text-secondary", "")
    } else {
        ("scale-100", "bg-secondary text-main", "hidden")
    };

    rsx! {
        div {
            class: "cursor-pointer transition-all duration-300 {class1}",
            onmouseenter: move |_| *is_popped.write() = true,
            onmouseleave: move |_| *is_popped.write() = false,
            div { class: "relative w-32 h-32 lg:w-48 lg:h-48 rounded-full flex flex-col items-center justify-center {class2} transition-colors duration-300 shadow-lg",
                div { class: "text-4xl lg:text-6xl mb-2", "{props.icon}" }
                span { class: "font-bold text-lg", "{props.year}" }
                div { class: "absolute left-1/2 bottom-full transform -translate-x-1/2 -translate-y-2 mt-2 bg-white p-4 rounded-lg shadow-md lg:w-80 w-52 {class3} transition-all duration-300",
                    h3 { class: "font-bold text-main", "{props.title}" }
                    p { class: "mt-2 text-slate-400 text-sm", "{props.description}" }
                }
            }
        }
    }
}

#[derive(serde::Deserialize)]
struct TimelineData {
    year: String,
    title: String,
    description: String,
    icon: String,
}

pub fn WhimsicalCVTimeline() -> Element {
    let timeline_data: Vec<TimelineData> =
        serde_json::from_str(include_str!("../../../public/timeline_data.json")).ok()?;

    rsx! {
        h2 { class: "md:my-10 my-5 font-bold text-main mb-8 text-center lg:text-3xl text-xl",
            "Journey"
        }
        div { class: "flex justify-center items-center relative flex-wrap z-0 gap-2 ",
            {timeline_data.into_iter().map(|data| {
                rsx! {
                        TimelineBubble {
                            year: data.year,
                        title: data.title,
                        description: data.description,
                            icon: data.icon
                        }
                    }
            })}
        }
    }
}

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
        (
            "scale-110",
            "bg-main text-secondary",
            "opacity-100 translate-y-0",
        )
    } else {
        (
            "scale-100",
            "bg-secondary text-main",
            "opacity-0 -translate-y-2",
        )
    };

    rsx! {
        div {
            class: "relative cursor-pointer transition-all duration-300 {class1}",
            onmouseenter: move |_| *is_popped.write() = true,
            onmouseleave: move |_| *is_popped.write() = false,
            div { class: "w-32 h-32 rounded-full flex flex-col items-center justify-center {class2} transition-colors duration-300 shadow-lg",
                // Note: You'll need to replace this with actual icon components
                div { class: "text-4xl mb-2", "{props.icon}" }
                span { class: "font-bold text-lg", "{props.year}" }
            }
            div { class: "absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white p-4 rounded-lg shadow-md w-80 {class3} transition-all duration-300",
                h3 { class: "font-bold text-main", "{props.title}" }
                p { class: "mt-2 text-slate-400 text-sm", "{props.description}" }
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
        div { class: "p-8 bg-gradient-to-r from-color-main via-color-secondary to-color-third rounded-xl",
            h2 { class: "text-3xl font-bold text-main mb-8 text-center", "Journey" }
            div { class: "flex justify-between items-center relative",
                div { class: "absolute top-1/2 left-0 right-0 h-1 bg-third transform -translate-y-1/2 rounded" }
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
}

use dioxus::prelude::*;

#[derive(Clone, Props, PartialEq)]
pub struct RotatableIconCardProps {
    tooltip: String,
    src: String,
    size_class: String,
    description: String,
}

pub fn RotatableIconCard(props: RotatableIconCardProps) -> Element {
    rsx! {
        div { class: "flex items-center justify-center ",
            div { class: props.size_class + " group scale:100 hover:scale-110",
                div { class: "relative h-full w-full rounded-xl shadow-none transition-all transform-all duration-1000 shadow-black/40 group-hover:shadow-xl [transform-style:preserve-3d] group-hover:scale-110 group-hover:[transform:rotateY(180deg)]",
                    div { class: "absolute inset-0",
                        img {
                            class: "h-full w-full rounded-xl object-cover shadow-none [backface-visibility:hidden]",
                            src: props.src.as_str()
                        }
                    }
                    div { class: "absolute inset-0 min-h-full h-fit w-full rounded-xl bg-main/55 [transform:rotateY(180deg)] [backface-visibility:hidden]",
                        div { class: "flex min-h-full flex-col justify-center items-center text-center text-sm lg:text-xl",
                            h1 { class: "font-bold text-slate-50 py-1 lg:py-5",
                                {props.tooltip.as_str()}
                            }
                            div { class: "text-slate-50", {props.description.as_str()} }
                        }
                    }
                }
            }
        }
    }
}

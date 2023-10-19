use dioxus::prelude::*;

use crate::components::popover::PopOver;

enum Type {
    Education(&'static str, u32, &'static str),
    Work(&'static str, u32, &'static str),
}

impl Type {
    fn started(&self) -> u32 {
        *match self {
            Type::Education(_, started, _) => started,
            Type::Work(_, started, _) => started,
        }
    }

    fn name(&self) -> &'static str {
        match self {
            Type::Education(name, _, _) => name,
            Type::Work(name, _, _) => name,
        }
    }

    fn years(&self) -> &'static str {
        match self {
            Type::Education(_, _, years) => years,
            Type::Work(_, _, years) => years,
        }
    }
}

pub fn EducationClientsTimeline(cx: Scope) -> Element {
    let mut education: [Type; 5] = [
        // Education:
        Type::Education(
            "National Technical University of Ukraine “Igor Sikorsky Kyiv Polytechnic Institute”",
            2019,
            "2019 - 2023",
        ),
        Type::Education("École 42", 2018, "2018-2020"),
        // Work:
        Type::Work(
            "Junior/Middle Engineer at Here Technologies via Intellias",
            2019,
            "Sep 2019 - Jan 2021",
        ),
        Type::Work(
            "Senior Engineer at Refinitiv via EPAM Systems",
            2021,
            "Jan 2021 - Jul 2022",
        ),
        Type::Work("Protocol Engineer at GGx", 2022, "Jul 2022 - Present"),
    ];

    education.sort_by(|a, b| a.started().cmp(&b.started()).reverse());
    let elements = education.into_iter().map(|element| {
        const TEXT: &str = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quam nisl, posuere sed quam vitae, tincidunt lobortis quam. Morbi non nunc porta, efficitur turpis lacinia, gravida risus. Fusce dignissim eros id justo elementum, at egestas ipsum posuere. Vivamus suscipit ullamcorper massa. Pellentesque ex nulla, fringilla sed consequat eu, sollicitudin eu nisi. Quisque pulvinar varius risus non pellentesque. Cras eu enim facilisis, maximus arcu quis, gravida lacus. Suspendisse id dui eget erat lobortis rhoncus at tristique turpis. Aliquam finibus commodo vestibulum. Donec maximus laoreet tempor. Phasellus viverra tortor eget euismod gravida. Cras auctor ante sed metus pretium eleifend.";

        let is_education = matches!(element, Type::Education(_, _, _));
        let classes = if is_education {
            "relative flex items-center justify-between md:justify-normal md:flex-row-reverse group"
        } else {
            "relative flex items-center justify-between md:justify-normal group"
        };
        let text_type = if is_education { "Education" } else { "Work" };

        rsx! {div {
            class: classes,

            PopOver {
                class: "relative w-[calc(100%-2rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded border shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30",
                title: element.name(),
                text: TEXT,
                div {
                    class: "flex items-center justify-between text-xs text-slate-500",
                    div {
                        text_type
                    }
                    time {
                        element.years()
                    }
                }
                div {
                    class: "text-slate-500 font-bold",
                    element.name()
                },
                div {
                    class: "text-slate-500 text-sm",
                    "Pretium lectus quam id leo. Urna et pharetra aliquam vestibulum morbi blandit cursus risus"
                }
            }
        }}
    });

    let rsx = rsx! { div {
        class: "mb-32 mt-5 m-5 md:m-10 md:mt-32 md:mb-32",
        h1 {
            class: "md:text-3xl text-xl font-bold text-center text-main",
            "Education & Work"
        }
        div {
            class: "mt-5 md:mt-10 space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent",
            elements
        }
    }};

    cx.render(rsx)
}

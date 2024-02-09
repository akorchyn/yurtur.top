use dioxus::prelude::*;

use dioxus_free_icons::{
    icons::fa_brands_icons::{FaGithub, FaInstagram, FaLinkedin, FaTelegram, FaTwitter, FaYoutube},
    Icon,
};

#[component]
pub fn Footer(cx: Scope) -> Element {
    let rsx = rsx!(footer {
        class: "fixed bottom-0 w-full bg-main p-safe-or-2 z-50 ",
        div {
            class: "flex space-x-4 p-2 w-full justify-center items-center",
            a {
                href: "https://www.t.me/akorchynskyi",
                target: "_blank",
                rel: "noopener noreferrer",
                Icon {
                    icon: FaTelegram,
                    fill: "white",
                }
            },
            a {
                href: "https://www.github.com/akorchyn",
                target: "_blank",
                rel: "noopener noreferrer",
                Icon {
                    icon: FaGithub,
                    fill: "white",
                }
            },
            a {
                href: "https://www.linkedin.com/in/akorchyn/",
                target: "_blank",
                rel: "noopener noreferrer",
                Icon {
                    icon: FaLinkedin,
                    fill: "white",
                }
            },
            a {
                href: "https://www.instagram.com/lsdgkljahgds/",
                target: "_blank",
                rel: "noopener noreferrer",
                Icon {
                    icon: FaInstagram,
                    fill: "white",
                }
            },
            a {
                href: "https://twitter.com/theYurtur",
                target: "_blank",
                rel: "noopener noreferrer",
                Icon {
                    icon: FaTwitter,
                    fill: "white",
                }
            },
            a {
                href: "https://www.youtube.com/user/Wolf49xxx",
                target: "_blank",
                rel: "noopener noreferrer",
                Icon {
                    icon: FaYoutube,
                    fill: "white",
                }
            },
        }
        div {
            class: "text-center text-white text-sm",

            a {
                href: "https://www.github.com/akorchyn/yurtur.top",
                target: "_blank",
                rel: "noopener noreferrer",
                "Source code"
            }
        }
    });
    cx.render(rsx)
}

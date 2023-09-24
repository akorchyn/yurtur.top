use dioxus::prelude::*;

use dioxus_free_icons::{
    icons::fa_brands_icons::{FaGithub, FaInstagram, FaLinkedin, FaTelegram, FaTwitter, FaYoutube},
    Icon,
};

pub fn Footer(cx: Scope) -> Element {
    let rsx = rsx!(footer {
        class: "fixed flex space-x-4 bg-main p-4 w-full justify-center items-center bottom-0",
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
    });
    cx.render(rsx)
}

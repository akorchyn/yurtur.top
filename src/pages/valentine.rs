use dioxus::prelude::*;

#[component]
pub fn Valentine(cx: Scope) -> Element {
    const QUESTIONS: [(&str, &str); 5] = [
        ("Ти будеш моєю Валентинкою? 🥰", "/valentines/prompt0.gif"),
        ("Може все таки? 😊", "/valentines/prompt1.gif"),
        ("Ну ну, можливо, все ж? 🙃", "/valentines/prompt2.gif"),
        ("Подумай ще трішки 🫠", "/valentines/prompt3.gif"),
        ("Останній шанс 😞", "/valentines/prompt4.gif"),
    ];
    let current_question = use_state(cx, || 0usize);
    let old_text = use_state(cx, || QUESTIONS[0].0);
    let success = use_state(cx, || false);

    let is_visible = *current_question.get() < QUESTIONS.len() && !*success.get();
    let hide_param = if is_visible { "visible" } else { "hidden" };
    let img = match (*success.get(), is_visible) {
        (true, _) => "/valentines/success.gif",
        (false, false) => "/valentines/fail.gif",
        _ => QUESTIONS[*current_question.get()].1,
    };

    let text = if *success.get() {
        "Безмежно кохаю тебе, Галюша! 🥰"
    } else {
        QUESTIONS
            .get(*current_question.get())
            .map(|(text, _)| *text)
            .unwrap_or("Хник-хник-хник. Кохаааааю... 😭")
    };
    let ((opacity1, text1), (opacity2, text2)) = if *current_question.get() % 2 == 0 {
        (("opacity-100", text), ("opacity-0", *old_text.get()))
    } else {
        (("opacity-0", *old_text.get()), ("opacity-100", text))
    };
    let scale = 100 + current_question.get() * 15;
    let other_scale = 100 - current_question.get() * 15;

    render!(div {
        class: "flex justify-center w-full flex-col items-center",
        div {
            class: "flex justify-center w-full mt-[5vh]",
            img {
                class: "h-64 rounded-xl",
                src: img,
            }
        }

        div {
            class: "flex justify-center flex-col items-center mt-[5vh] ease-fade-out",
            div {
                class: "relative px-5 text-5xl md:text-6xl text-center font-bold text-main  contrast-90",
                p {
                    class: "absolute w-full left-1/2 top-0 -translate-x-1/2 transition-all duration-1000 ease-linear {opacity1}",
                    text1,
                }
                p {
                    class: "absolute w-full left-1/2 top-0 -translate-x-1/2 transition-all duration-1000 ease-linear {opacity2}",
                    text2,
                }
                p {
                    class: "text-center opacity-0",
                    if text1.len() > text2.len() {
                        text1
                    } else {
                        text2
                    }
                }
            }
            div {
                class: "flex mt-10 {hide_param}",
                button {
                    class: "px-16 py-4 m-2 bg-green-500 text-white rounded-lg transition-all duration-300 ease-in-out",
                    style: "scale:{scale}%;",
                    onclick: |_| {
                        current_question.set(*current_question.get() + 1);
                        old_text.set(text);
                        success.set(true);
                    },
                    "Так",
                }
                button {
                    class: "px-16 py-4 m-2 bg-red-500 text-white rounded-lg transition-all duration-300 ease-in-out",
                    style: "scale:{other_scale}%;",
                    onclick: |_| {
                        old_text.set(text);
                        current_question.set(*current_question.get() + 1);
                    },
                    "Ні"
                }
            }
        }
    })
}

use std::{cell::Cell, f64::consts::PI, rc::Rc, time::Duration};

use dioxus::prelude::*;
use wasm_bindgen::{prelude::Closure, JsCast, JsValue};

#[derive(PartialEq, Props, Clone)]
pub struct Props {
    pub text: String,
    pub scale: f64,
    pub size: u32,
    pub x_offset: i32,
    pub y_offset: i32,
}

pub fn ParticleText(cx: Scope<Props>) -> Element {
    let id = use_state(cx, || format!("particle-text-{}", cx.props.text));

    use_effect(cx, (cx.props, id), |(props, id)| {
        to_owned![props];
        async move {
            let (window, canvas, context) = start_render_loop(id.as_str());
            let mut particles = vec![];
            let mouse: Rc<_> = Rc::new(Cell::new(Mouse::new(
                f64::INFINITY,
                f64::INFINITY,
                props.scale,
            )));

            // Should be alive for the whole time
            let _closure = {
                let canvas = canvas.clone();
                let mouse = mouse.clone();
                let closure = Closure::<dyn FnMut(_)>::new(move |event: web_sys::MouseEvent| {
                    let rect = canvas.get_bounding_client_rect();
                    let scale_x = canvas.width() as f64 / rect.width();
                    let scale_y = canvas.height() as f64 / rect.height();
                    mouse.set(Mouse::new(
                        (event.client_x() as f64 - rect.left()) * scale_x,
                        (event.client_y() as f64 - rect.top()) * scale_y,
                        props.scale,
                    ));
                });
                window
                    .add_event_listener_with_callback("mousemove", closure.as_ref().unchecked_ref())
                    .unwrap();
                closure
            };

            context.set_font("bold 20px ui-sans-serif");
            context.set_fill_style(&JsValue::from_str("#f08cae"));
            for (i, line) in props.text.split('\n').enumerate() {
                context.fill_text(line, 0.0, 30.0 * (i + 1) as f64).unwrap();
            }
            let data = context.get_image_data(0., 0., 500., 500.).unwrap();

            for y in 0..data.height() {
                for x in 0..data.width() {
                    let index = (y * data.width() + x) * 4 + 3;

                    if data.data()[index as usize] > 0 {
                        let x = (x as i32 + props.x_offset) as f64;
                        let y = (y as i32 + props.y_offset) as f64;
                        particles.push(Particle::new(x, y, props.scale, props.size));
                    }
                }
            }
            loop {
                particles
                    .iter_mut()
                    .for_each(|particle: &mut Particle| particle.update(mouse.get()));
                context.clear_rect(0., 0., canvas.width() as f64, canvas.height() as f64);

                render_loop(&context, &particles);
                async_std::task::sleep(Duration::from_millis(10)).await;
            }
        }
    });

    let rsx = rsx! {
        canvas {
            class: "container",
            id: id.get().as_str(),
        }
    };
    cx.render(rsx)
}

fn start_render_loop(
    id: &str,
) -> (
    web_sys::Window,
    web_sys::HtmlCanvasElement,
    web_sys::CanvasRenderingContext2d,
) {
    let window = web_sys::window().expect("global window does not exists");
    let document = window.document().expect("expecting a document on window");
    let canvas = document
        .get_element_by_id(id)
        .expect("expecting a canvas in the document")
        .dyn_into::<web_sys::HtmlCanvasElement>()
        .unwrap();
    canvas.set_width(window.inner_width().unwrap().as_f64().unwrap() as u32);
    canvas.set_height(window.inner_height().unwrap().as_f64().unwrap() as u32);
    let context = canvas
        .get_context("2d")
        .unwrap()
        .unwrap()
        .dyn_into::<web_sys::CanvasRenderingContext2d>()
        .unwrap();

    (window, canvas, context)
}

fn render_loop(context: &web_sys::CanvasRenderingContext2d, particles: &Vec<Particle>) {
    for particle in particles {
        particle.draw(context);
    }

    // Connect particles
    for particle in particles.iter() {
        for other_particle in particles.iter() {
            let dx = particle.x - other_particle.x;
            let dy = particle.y - other_particle.y;
            let distance = (dx * dx + dy * dy).sqrt();
            let threshold = particle.scale * 3.;
            if distance < threshold {
                let opacity = 1. - distance / threshold;

                context.begin_path();
                context.set_stroke_style(&JsValue::from_str(
                    format!("rgba(240, 140, 174, {})", opacity).as_str(),
                ));
                context.move_to(particle.x, particle.y);
                context.line_to(other_particle.x, other_particle.y);
                context.stroke();
            }
        }
    }
}

#[derive(Debug, Clone, Copy)]
struct Mouse {
    x: f64,
    y: f64,
    radius: f64,
}

impl Mouse {
    fn new(x: f64, y: f64, scale: f64) -> Self {
        Self {
            x,
            y,
            radius: scale * 5.,
        }
    }
}

struct Particle {
    x: f64,
    y: f64,
    size: u32,
    base_x: f64,
    base_y: f64,
    density: f64,
    scale: f64,
}

impl Particle {
    fn new(x: f64, y: f64, scale: f64, size: u32) -> Self {
        let x = x * scale;
        let y = y * scale;
        Self {
            x,
            y,
            size,
            base_x: x,
            base_y: y,
            density: js_sys::Math::random() * 30.0 + 1.0,
            scale,
        }
    }

    fn draw(&self, context: &web_sys::CanvasRenderingContext2d) {
        context.set_fill_style(&JsValue::from_str("#f08cae"));
        context.begin_path();
        context
            .arc(self.x, self.y, self.size as f64, 0.0, PI * 2.0)
            .unwrap();
        context.close_path();
        context.fill();
    }

    fn update(&mut self, mouse: Mouse) {
        let dx = mouse.x - self.x;
        let dy: f64 = mouse.y - self.y;
        let distance = (dx * dx + dy * dy).sqrt();
        let force_direction_x = dx / distance;
        let force_direction_y = dy / distance;
        let max_distance = mouse.radius;
        let force = (max_distance - distance) / max_distance;
        let direction_x = force_direction_x * force * self.density;
        let direction_y = force_direction_y * force * self.density;

        if distance < 5. * self.scale {
            self.x -= direction_x;
            self.y -= direction_y;
        } else {
            let dx = self.x - self.base_x;
            let dy = self.y - self.base_y;
            self.x -= dx / 10.;
            self.y -= dy / 10.;
        }
    }
}

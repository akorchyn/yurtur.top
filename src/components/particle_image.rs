use std::{cell::Cell, f64::consts::PI, rc::Rc, time::Duration};

use dioxus::prelude::*;
use image::{ImageBuffer, Rgba};
use wasm_bindgen::{prelude::Closure, JsCast, JsValue};
use web_sys::TouchList;

#[derive(PartialEq, Props, Clone)]
pub struct Props {
    pub scale: f64,
    pub size: u32,
    pub x_offset: i32,
    pub y_offset: i32,
    pub image: ImageBuffer<Rgba<u8>, Vec<u8>>,
}

pub fn ParticleImage(cx: Scope<Props>) -> Element {
    use_effect(cx, (cx.props,), |(props,)| {
        to_owned![props];
        async move {
            let (window, canvas, context) = start_render_loop();
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
                let handle_change = move |x, y| {
                    let rect = canvas.get_bounding_client_rect();
                    let scale_x = canvas.width() as f64 / rect.width();
                    let scale_y = canvas.height() as f64 / rect.height();
                    mouse.set(Mouse::new(
                        (x as f64 - rect.left()) * scale_x,
                        (y as f64 - rect.top()) * scale_y,
                        props.scale,
                    ));
                };

                let handle_change_tmp = handle_change.clone();
                let mouse_closure =
                    Closure::<dyn FnMut(_)>::new(move |event: web_sys::MouseEvent| {
                        handle_change_tmp(event.client_x(), event.client_y())
                    });

                let touch_closure =
                    Closure::<dyn FnMut(_)>::new(move |event: web_sys::TouchEvent| {
                        let touch = &event.touches().get(0);
                        if let Some(touch) = touch {
                            handle_change(touch.client_x(), touch.client_y())
                        }
                    });
                window
                    .add_event_listener_with_callback(
                        "mousemove",
                        mouse_closure.as_ref().unchecked_ref(),
                    )
                    .unwrap();

                window
                    .add_event_listener_with_callback(
                        "touchmove",
                        touch_closure.as_ref().unchecked_ref(),
                    )
                    .unwrap();
                (mouse_closure, touch_closure)
            };
            let mut skip = 0;
            for y in 0..props.image.height() {
                for x in 0..props.image.width() {
                    if skip > 0 {
                        skip -= 1;
                        continue;
                    }
                    if props.image.get_pixel(x, y).0[0] < 127 {
                        let x = (x as i32 + props.x_offset) as f64;
                        let y = (y as i32 + props.y_offset) as f64;
                        particles.push(Particle::new(x, y, props.scale, props.size));
                        skip = y as usize % 10 + x as usize % 10;
                    }
                }
            }
            render_loop(&context, &particles);
            loop {
                let mut any = false;
                // Update particles
                for particle in particles.iter_mut() {
                    any |= particle.update(mouse.get());
                }

                if any {
                    context.clear_rect(0., 0., canvas.width() as f64, canvas.height() as f64);
                    render_loop(&context, &particles);
                }
                async_std::task::sleep(Duration::from_millis(10)).await;
            }
        }
    });

    let rsx = rsx! {
        canvas {
            class: "w-full h-full",
            id: "particle-image",
        }
    };
    cx.render(rsx)
}

fn start_render_loop() -> (
    web_sys::Window,
    web_sys::HtmlCanvasElement,
    web_sys::CanvasRenderingContext2d,
) {
    let window = web_sys::window().expect("global window does not exists");
    let document = window.document().expect("expecting a document on window");
    let canvas = document
        .get_element_by_id("particle-image")
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
    'top: for (i, particle) in particles.iter().enumerate() {
        let mut connections = 10;
        for other_particle in particles.iter().skip(i + 1) {
            let dx = particle.x - other_particle.x;
            let dy = particle.y - other_particle.y;
            let distance = (dx * dx + dy * dy).sqrt();
            let threshold = particle.scale * 10.;
            if distance < threshold {
                let opacity = 1. - distance / threshold;

                context.begin_path();
                context.set_stroke_style(&JsValue::from_str(
                    format!("rgba(240, 140, 174, {})", opacity).as_str(),
                ));
                context.move_to(particle.x, particle.y);
                context.line_to(other_particle.x, other_particle.y);
                context.stroke();

                connections -= 1;
                if connections == 0 {
                    continue 'top;
                }
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
            radius: scale * 25.,
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

    fn update(&mut self, mouse: Mouse) -> bool {
        let dx = mouse.x - self.x;
        let dy: f64 = mouse.y - self.y;
        let distance = (dx * dx + dy * dy).sqrt();
        let force_direction_x = dx / distance;
        let force_direction_y = dy / distance;
        let max_distance = mouse.radius;
        let force = (max_distance - distance) / max_distance;
        let direction_x = force_direction_x * force * self.density;
        let direction_y = force_direction_y * force * self.density;

        if distance <= 20. * self.scale {
            self.x -= direction_x;
            self.y -= direction_y;
            true
        } else if distance >= 20.5 * self.scale {
            let dx = self.x - self.base_x;
            let dy = self.y - self.base_y;
            self.x -= dx / 10.;
            self.y -= dy / 10.;

            !(dx.abs() < 1. && dy.abs() < 1.)
        } else {
            false
        }
    }
}

// use std::{cell::Cell, f64::consts::PI, rc::Rc, time::Duration};

// use dioxus::prelude::*;
// use image::{ImageBuffer, Rgba};
// use wasm_bindgen::{prelude::Closure, JsCast, JsValue};

// #[derive(PartialEq, Props, Clone)]
// pub struct Props {
//     pub class: String,
//     pub image: ImageBuffer<Rgba<u8>, Vec<u8>>,
// }

// pub fn ParticleImage(cx: Scope<Props>) -> Element {
//     use_effect(cx, (cx.props,), |(props,)| {
//         to_owned![props];
//         async move {
//             let (window, canvas, context, parent) = start_render_loop();
//             let mouse: Rc<_> = Rc::new(Cell::new(Mouse::new(f64::INFINITY, f64::INFINITY)));
//             let mouse_tmp = mouse.clone();
//             let image_width = props.image.width();

//             // Should be alive for the whole time
//             let _closure = {
//                 let canvas = canvas.clone();
//                 let mouse = mouse.clone();
//                 let handle_change = move |x, y| {
//                     let scale = canvas.width() as f64 / image_width as f64;
//                     let rect = canvas.get_bounding_client_rect();
//                     let scale_x = canvas.width() as f64 / rect.width();
//                     let scale_y = canvas.height() as f64 / rect.height();
//                     mouse.set(Mouse::new(
//                         (x as f64 - rect.left()) * scale_x / scale,
//                         (y as f64 - rect.top()) * scale_y / scale,
//                     ));
//                 };

//                 let handle_change_tmp = handle_change.clone();
//                 let mouse_closure =
//                     Closure::<dyn FnMut(_)>::new(move |event: web_sys::MouseEvent| {
//                         handle_change_tmp(event.client_x(), event.client_y())
//                     });

//                 let touch_closure =
//                     Closure::<dyn FnMut(_)>::new(move |event: web_sys::TouchEvent| {
//                         let touch = &event.touches().get(0);
//                         if let Some(touch) = touch {
//                             handle_change(touch.client_x(), touch.client_y())
//                         }
//                     });

//                 let mouse_leave = Closure::<dyn FnMut(_)>::new(move |_: web_sys::MouseEvent| {
//                     mouse_tmp.set(Mouse::new(f64::INFINITY, f64::INFINITY));
//                 });

//                 parent
//                     .add_event_listener_with_callback(
//                         "mousemove",
//                         mouse_closure.as_ref().unchecked_ref(),
//                     )
//                     .unwrap();

//                 window
//                     .add_event_listener_with_callback(
//                         "touchmove",
//                         touch_closure.as_ref().unchecked_ref(),
//                     )
//                     .unwrap();

//                 parent.add_event_listener_with_callback(
//                     "mouseleave",
//                     mouse_leave.as_ref().unchecked_ref(),
//                 );
//                 (mouse_closure, touch_closure, mouse_leave)
//             };
//             let mut particles = fill_particles(&props);
//             let scale = canvas.width() as f64 / props.image.width() as f64;
//             render_loop(&context, &particles, scale);
//             loop {
//                 let mut any = false;
//                 // Update particles
//                 for particle in particles.iter_mut() {
//                     any |= particle.update(mouse.get());
//                 }

//                 if parent.client_width() != canvas.width() as i32
//                     || parent.client_height() != canvas.height() as i32
//                 {
//                     context.clear_rect(0., 0., canvas.width() as f64, canvas.height() as f64);
//                     canvas.set_width(parent.client_width() as u32);
//                     canvas.set_height(parent.client_height() as u32);
//                     any = true;
//                 }

//                 if any {
//                     context.clear_rect(0., 0., canvas.width() as f64, canvas.height() as f64);
//                     let scale = canvas.width() as f64 / props.image.width() as f64;
//                     render_loop(&context, &particles, scale);
//                 }
//                 async_std::task::sleep(Duration::from_millis(10)).await;
//             }
//         }
//     });

//     let rsx = rsx! {
//         div {
//             id: "particle-image-container",
//             class: cx.props.class.as_str(),
//             canvas {
//                 id: "particle-image",
//             }
//         }
//     };
//     cx.render(rsx)
// }

// fn fill_particles(props: &Props) -> Vec<Particle> {
//     let mut skip = 0;

//     let mut particles = Vec::new();
//     for y in 0..props.image.width() {
//         for x in 0..props.image.height() {
//             if skip > 0 {
//                 skip -= 1;
//                 continue;
//             }
//             if props.image.get_pixel(x, y).0[0] == 255 {
//                 particles.push(Particle::new(x.into(), y.into()));
//                 if y > 0 && y < props.image.height() - 1 && x > 0 && x < props.image.width() - 1 {
//                     skip = y as usize % 10 + x as usize % 10;
//                 }
//             }
//         }
//     }
//     particles
// }

// fn start_render_loop() -> (
//     web_sys::Window,
//     web_sys::HtmlCanvasElement,
//     web_sys::CanvasRenderingContext2d,
//     web_sys::HtmlElement,
// ) {
//     let window = web_sys::window().expect("global window does not exists");
//     let document = window.document().expect("expecting a document on window");
//     let parent = document
//         .get_element_by_id("particle-image-container")
//         .expect("expecting a parent element in the document")
//         .dyn_into::<web_sys::HtmlElement>()
//         .unwrap();
//     let canvas = document
//         .get_element_by_id("particle-image")
//         .expect("expecting a canvas in the document")
//         .dyn_into::<web_sys::HtmlCanvasElement>()
//         .unwrap();
//     log::warn!("{} {}", parent.client_width(), parent.client_height());
//     canvas.set_width(parent.client_width() as u32);
//     canvas.set_height(parent.client_height() as u32);
//     let context = canvas
//         .get_context("2d")
//         .unwrap()
//         .unwrap()
//         .dyn_into::<web_sys::CanvasRenderingContext2d>()
//         .unwrap();

//     (window, canvas, context, parent)
// }

// fn render_loop(context: &web_sys::CanvasRenderingContext2d, particles: &Vec<Particle>, scale: f64) {
//     let particle_radius = 1.0 * scale;
//     for particle in particles {
//         particle.draw(context, scale, particle_radius);
//     }

//     let THRESHOLD: f64 = 10.0;
//     let threshold: f64 = THRESHOLD / scale;

//     // Connect particles
//     'top: for (i, particle) in particles.iter().enumerate() {
//         let mut connections = 5;
//         for other_particle in particles.iter().skip(i + 1) {
//             let dx = particle.x - other_particle.x;
//             let dy = particle.y - other_particle.y;
//             let distance = (dx * dx + dy * dy).sqrt();
//             if distance < THRESHOLD {
//                 let opacity = 1. - distance / THRESHOLD;

//                 context.begin_path();
//                 context.set_stroke_style(&JsValue::from_str(
//                     format!("rgba(240, 140, 174, {})", opacity).as_str(),
//                 ));
//                 context.move_to(particle.x * scale, particle.y * scale);
//                 context.line_to(other_particle.x * scale, other_particle.y * scale);
//                 context.stroke();

//                 connections -= 1;
//                 if connections == 0 {
//                     continue 'top;
//                 }
//             }
//         }
//     }
// }

// #[derive(Debug, Clone, Copy)]
// struct Mouse {
//     x: f64,
//     y: f64,
//     radius: f64,
// }

// impl Mouse {
//     fn new(x: f64, y: f64) -> Self {
//         Self { x, y, radius: 25.0 }
//     }
// }

// struct Particle {
//     x: f64,
//     y: f64,
//     base_x: f64,
//     base_y: f64,
//     density: f64,
// }

// impl Particle {
//     fn new(x: f64, y: f64) -> Self {
//         Self {
//             x,
//             y,
//             base_x: x,
//             base_y: y,
//             density: js_sys::Math::random() * 30.0 + 1.0,
//         }
//     }

//     fn draw(&self, context: &web_sys::CanvasRenderingContext2d, scale: f64, scaled_radius: f64) {
//         context.set_fill_style(&JsValue::from_str("#f08cae"));
//         context.begin_path();
//         context
//             .arc(self.x * scale, self.y * scale, scaled_radius, 0.0, PI * 2.0)
//             .unwrap();
//         context.close_path();
//         context.fill();
//     }

//     fn update(&mut self, mouse: Mouse) -> bool {
//         let dx = mouse.x - self.x;
//         let dy: f64 = mouse.y - self.y;
//         let distance = (dx * dx + dy * dy).sqrt();
//         let force_direction_x = dx / distance;
//         let force_direction_y = dy / distance;
//         let max_distance = mouse.radius;
//         let force = (max_distance - distance) / max_distance;
//         let direction_x = force_direction_x * force * self.density;
//         let direction_y = force_direction_y * force * self.density;

//         if distance <= 20. {
//             self.x -= direction_x;
//             self.y -= direction_y;
//             true
//         } else if distance >= 25.0 {
//             let dx = self.x - self.base_x;
//             let dy = self.y - self.base_y;
//             self.x -= dx / 10.;
//             self.y -= dy / 10.;

//             !(dx.abs() < 1. && dy.abs() < 1.)
//         } else {
//             false
//         }
//     }
// }

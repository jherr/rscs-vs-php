#[macro_use] extern crate rocket;
use serde::{Deserialize,Serialize};
use rocket_dyn_templates::Template;
use rocket::fs::NamedFile;
use std::path::{Path, PathBuf};

#[derive(Debug, Deserialize, Serialize, Clone)]
#[serde(crate = "rocket::serde")]
struct Pokemon {
    name: String,
    r#type: Vec<String>,
    hp: u32,
    attack: u32,
    defense: u32,
    special_attack: u32,
    special_defense: u32,
    speed: u32,
}

#[derive(Debug, Serialize)]
struct TemplateData {
    pokemon: Vec<Pokemon>,
}

#[get("/static/<file..>")]
async fn files(file: PathBuf) -> Option<NamedFile> {
    NamedFile::open(Path::new("static/").join(file)).await.ok()
}

fn get_pokemon() -> Vec<Pokemon> {
    let json_data: String = ureq::get("http://localhost:8080/pokemon.json")
        .call()
        .expect("Failed to retrieve JSON data")
        .into_string()
        .expect("Failed to read JSON data");

    serde_json::from_str(&json_data).expect("Failed to parse JSON")
}

#[get("/search?<q>")]
fn search(q: &str) -> Template {
    let search_string = q.to_lowercase();

    let filtered_pokemons:Vec<Pokemon> = get_pokemon()
        .iter()
        .filter(|pokemon| pokemon.name.to_lowercase().contains(&search_string))
        .take(20)
        .cloned()
        .collect();

    let context = TemplateData {
        pokemon: filtered_pokemons,
    };

    Template::render("partial", &context)
}

#[get("/")]
fn index() -> Template {
    let pokemon = get_pokemon()
        .iter()
        .take(20)
        .cloned()
        .collect();

    let context = TemplateData {
        pokemon: pokemon,
    };

    Template::render("index", &context)
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", routes![index, search, files])
        .attach(Template::fairing())
}
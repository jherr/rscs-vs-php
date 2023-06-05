use axum::{
    extract::{Query, State},
    routing::get,
    Router,
};

use tower_http::services::ServeDir;

////////////////////////////////////////////////////////////////////////////////////////////////////

#[tokio::main]
async fn main() {
    let router = Router::new()
        .route("/", get(index))
        .route("/search", get(search))
        .with_state(ApiState {
            http_client: reqwest::Client::new(),
        })
        .nest_service("/static", ServeDir::new("static"));

    let addr = "0.0.0.0:8001".parse().unwrap();
    println!("Listening on http://{addr}");
    axum::Server::bind(&addr)
        .serve(router.into_make_service())
        .await
        .unwrap();
}

async fn index(State(state): State<ApiState>) -> IndexTemplate {
    let pokemon = get_pokemon(&state.http_client).await.unwrap();
    IndexTemplate { pokemon }
}

async fn search(State(state): State<ApiState>, params: Query<Params>) -> PartialTemplate {
    let name = params.q.to_lowercase();

    let pokemon = get_pokemon(&state.http_client)
        .await
        .unwrap()
        .into_iter()
        .filter(|pokemon| pokemon.name.to_lowercase().contains(&name))
        .take(20)
        .collect();

    PartialTemplate { pokemon }
}

#[derive(Debug, serde::Deserialize)]
struct Params {
    q: String,
}

#[derive(Debug, Clone)]
struct ApiState {
    http_client: reqwest::Client,
}

////////////////////////////////////////////////////////////////////////////////////////////////////

async fn get_pokemon(http_client: &reqwest::Client) -> Result<Vec<Pokemon>, color_eyre::Report> {
    Ok(http_client
        .get("http://localhost:8080/pokemon.json")
        .send()
        .await?
        .json()
        .await?)
}

#[derive(Debug, serde::Deserialize, serde::Serialize)]
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

////////////////////////////////////////////////////////////////////////////////////////////////////

#[derive(askama::Template)]
#[template(path = "index.html")]
struct IndexTemplate {
    pokemon: Vec<Pokemon>,
}

#[derive(askama::Template)]
#[template(path = "partial.html")]
struct PartialTemplate {
    pokemon: Vec<Pokemon>,
}

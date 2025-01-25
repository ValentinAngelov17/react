import ReactMarkdown from "react-markdown"

export default function GptRecipe(props) {
    return (
        <section className="suggested-recipe-container" aria-live="polite">
            <h2 className="gpt-recommends">Chef GPT Recommends:</h2>
            <ReactMarkdown>{props.recipe}</ReactMarkdown>
        </section>
    )
}
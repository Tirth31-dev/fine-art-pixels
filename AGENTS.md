<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project architecture

- Keep the public portfolio as a single scrolling home route because its section-to-section editorial composition is the core experience.
- Implement imagery depth motion with CSS perspective and a client-effect hook inside reveal wrappers, rather than a WebGL scene, to preserve the existing portfolio composition and avoid extra rendering overhead.

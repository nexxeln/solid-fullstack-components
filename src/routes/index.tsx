import { type ParentComponent, Switch, Match, createResource } from "solid-js";
import { Title } from "solid-start";

const Home: ParentComponent = () => {
  const [res] = createResource(() =>
    fetch("/api/notes").then((res) => res.json())
  );

  return (
    <>
      <Title>Home</Title>
      <div>
        <Switch 
          fallback={
            <pre class="font-bold text-2xl text-gray">
              {JSON.stringify(res())}
            </pre>
          }
        >
          <Match when={res.loading}>
            <div class="font-bold text-2xl text-gray">Loading...</div>
          </Match>
        </Switch>
      </div>
    </>
  );
};

export default Home;

import React from "react";
import { ThemeProvider } from "@/components/ThemeContext";
import ThemedButton from "@/components/buttons/ThemedButton";
import UseEffectComponent from "@/components/UseEffectComponent";
import UseCallbackComponent from "@/components/UseCallbackComponent";
// import UseMemoComponent from "@/components/UseMemoComponent";
import EventHooks from "@/components/EventHooks";
import SimpleForm from "@/components/SimpleForm";
import ConditionalDemo from "@/components/ConditionalDemo";
import ListAndKey from "@/components/ListAndKey";
import FetchAPI from "@/components/FetchAPI";
import Axios from "@/components/Axios";
import RestApiCrud from "@/components/RestApiCrud";

export default function Home() {
  return (
    <>
      {/* <ThemeProvider>
        <div style={{ padding: "20px" }}>
          <h1>useContext Example</h1>
          <ThemedButton />
        </div>
      </ThemeProvider> */}

      {/* <UseEffectComponent /> */}

      {/* <UseCallbackComponent /> */}

      {/* <UseMemoComponent /> */}

      {/* <EventHooks /> */}

      {/* <SimpleForm /> */}

      {/* <ConditionalDemo /> */}
      {/* <ListAndKey /> */}

      {/* <FetchAPI /> */}

      {/* <Axios /> */}

      <RestApiCrud />
    </>
  );
}

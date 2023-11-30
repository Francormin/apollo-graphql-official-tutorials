import React from "react";
import { BrowserRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

const renderApollo = (node, { mocks, addTypename, defaultOptions, cache, resolvers, ...options }) => {
  return render(
    <MockedProvider
      mocks={mocks}
      addTypename={addTypename}
      defaultOptions={defaultOptions}
      cache={cache}
      resolvers={resolvers}
      removeTypename
    >
      {node}
    </MockedProvider>,
    options
  );
};

export const renderWithRouterGenerator = renderer => (node, options) => {
  return renderer(<BrowserRouter>{node}</BrowserRouter>, options);
};

export const renderWithRouter = renderWithRouterGenerator(render);

export const renderApolloWithRouter = renderWithRouterGenerator(renderApollo);

export * from "@testing-library/react";
export { renderApollo };

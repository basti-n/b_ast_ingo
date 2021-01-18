// ./styled-components.d.ts

export type BoardTheme = {
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
};

declare module 'styled-components' {
  export interface DefaultTheme extends BoardTheme {}
}

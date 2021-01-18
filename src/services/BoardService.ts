import { NumberOfTiles } from '../components/Board';

export type BoardTexts = string[];

export class BoardService {
  static getSpecialTileIndex(tiles: NumberOfTiles): number {
    return Math.floor(tiles / 2);
  }

  get texts(): Promise<BoardTexts> {
    return fetch('content.json')
      .then((res) => res.json() as Promise<{ texts: BoardTexts }>)
      .then((data) => data?.texts)
      .catch((err) => this.handleError<BoardTexts>(err, []));
  }

  private handleError<ReturnType>(
    err: Error,
    fallbackReturn?: any,
  ): ReturnType extends any ? ReturnType : null {
    console.error(
      err.message ?? 'Unknown error occured fetching data',
    );

    return fallbackReturn ?? null;
  }
}

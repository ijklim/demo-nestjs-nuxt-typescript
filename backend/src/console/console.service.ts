import { Injectable } from '@nestjs/common';
import { Console } from './console.interface';

@Injectable()
export class ConsoleService {
  private consoles: Console[] = [
    {
      id: 'nes',
      name: 'Nintendo Entertainment System',
      releaseYear: 1983,
      manufacturer: 'Nintendo',
      topGames: [
        { gameName: 'Super Mario Bros.', year: 1985, genre: 'Platformer' },
        { gameName: 'The Legend of Zelda', year: 1986, genre: 'Action-Adventure' },
        { gameName: 'Metroid', year: 1986, genre: 'Action-Adventure' },
      ],
    },
    {
      id: 'snes',
      name: 'Super Nintendo Entertainment System',
      releaseYear: 1990,
      manufacturer: 'Nintendo',
      topGames: [
        { gameName: 'Super Mario World', year: 1990, genre: 'Platformer' },
        { gameName: 'The Legend of Zelda: A Link to the Past', year: 1991, genre: 'Action-Adventure' },
        { gameName: 'Chrono Trigger', year: 1995, genre: 'RPG' },
      ],
    },
    {
      id: 'ps1',
      name: 'PlayStation',
      releaseYear: 1994,
      manufacturer: 'Sony',
      topGames: [
        { gameName: 'Final Fantasy VII', year: 1997, genre: 'RPG' },
        { gameName: 'Metal Gear Solid', year: 1998, genre: 'Stealth' },
        { gameName: 'Castlevania: Symphony of the Night', year: 1997, genre: 'Action-Adventure' },
      ],
    },
  ];

  findAll(): Console[] {
    return this.consoles;
  }

  addConsole(newConsole: Console): void {
    this.consoles.push(newConsole);
  }
}

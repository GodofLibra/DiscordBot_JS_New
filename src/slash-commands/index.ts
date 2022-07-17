import { SlashCommand } from '../types';
import { AddCommand } from './add';
import { GetRandomAnimeCommand } from './get-randdom-anime';
import { GoogleCommand } from './google';
import { HelloCommand } from './hello';
import { PollCommand } from './poll';
import { UserInfoCommand } from './user-info';

export const SlashCommands: SlashCommand[] = [
  HelloCommand,
  AddCommand,
  UserInfoCommand,
  GoogleCommand,
  PollCommand,
  GetRandomAnimeCommand,
];

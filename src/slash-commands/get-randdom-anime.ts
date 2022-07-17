import { hyperlink, SlashCommandBuilder } from '@discordjs/builders';
import axios from 'axios';
import { MessageEmbed } from 'discord.js';
import { SlashCommand } from '../types';

const GET_RANDOM_ANIME_URL = 'https://api.jikan.moe/v4/random/anime';

type GetRandomAnimeResponse = {
  data: {
    mal_id: 0;
    url: 'string';
    images: {
      webp: {
        image_url: 'string';
        small_image_url: 'string';
        large_image_url: 'string';
      };
    };
    trailer: {
      youtube_id: 'string';
      url: 'string';
      embed_url: 'string';
    };
    approved: true;
    titles: ['string'];
    title: 'string';
    title_english: 'string';
    title_japanese: 'string';
    title_synonyms: ['string'];
    type: 'TV';
    source: 'string';
    episodes: 0;
    status: 'Finished Airing';
    airing: true;
    aired: {
      from: 'string';
      to: 'string';
      prop: {
        from: {
          day: 0;
          month: 0;
          year: 0;
        };
        to: {
          day: 0;
          month: 0;
          year: 0;
        };
        string: 'string';
      };
    };
    duration: 'string';
    rating: 'G - All Ages';
    score: 0;
    scored_by: 0;
    rank: 0;
    popularity: 0;
    members: 0;
    favorites: 0;
    synopsis: 'string';
    background: 'string';
    season: 'summer';
    year: 0;
    broadcast: {
      day: 'string';
      time: 'string';
      timezone: 'string';
      string: 'string';
    };
    producers: [
      {
        mal_id: 0;
        type: 'string';
        name: 'string';
        url: 'string';
      }
    ];
    licensors: [
      {
        mal_id: 0;
        type: 'string';
        name: 'string';
        url: 'string';
      }
    ];
    studios: [
      {
        mal_id: 0;
        type: 'string';
        name: 'string';
        url: 'string';
      }
    ];
    genres: [
      {
        mal_id: 0;
        type: 'string';
        name: 'string';
        url: 'string';
      }
    ];
    explicit_genres: [
      {
        mal_id: 0;
        type: 'string';
        name: 'string';
        url: 'string';
      }
    ];
    themes: [
      {
        mal_id: 0;
        type: 'string';
        name: 'string';
        url: 'string';
      }
    ];
    demographics: [
      {
        mal_id: 0;
        type: 'string';
        name: 'string';
        url: 'string';
      }
    ];
  };
};

export const GetRandomAnimeCommand: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName('get_random_anime')
    .setDescription('return a random anime'),
  async run(interaction) {
    const addField = (field: string, value: string | number) => {
      if (value) {
        embed.addField(field, value.toString(), true);
      }
    };
    await interaction.deferReply();

    const response = await axios.get<GetRandomAnimeResponse['data']>(
      GET_RANDOM_ANIME_URL,
      {
        transformResponse: (response) => {
          const json: GetRandomAnimeResponse = JSON.parse(response);
          return json.data;
        },
      }
    );
    const {
      data: {
        title,
        title_japanese,
        images: {
          webp: { image_url },
        },
        rank,
        url,
        type,
        synopsis,
        status,
        score,
        scored_by,
        source,
        season,
        duration,
        episodes,
        rating,
        genres,
        themes,
      },
    } = response;

    const embed = new MessageEmbed()
      .setTitle(title)
      .setURL(url)
      .setImage(image_url)
      .setAuthor({ name: title_japanese })
      .setDescription(synopsis);
    addField('Rank', rank);
    addField('Type', type);
    addField('Score', score);
    addField('Scored_by', scored_by);
    addField('Source', source);
    addField('Rating', rating);
    addField('Status', status);
    addField('Duration', duration);
    addField('Episodes', episodes);
    addField('Seasons', season);

    const genresString = genres
      .map(({ name, url }) => hyperlink(name, url))
      .join('\n');
    const themesString = themes
      .map(({ name, url }) => hyperlink(name, url))
      .join('\n');

    addField('Generes', genresString);
    addField('Themes', themesString);

    await interaction.editReply({ embeds: [embed] });
  },
};

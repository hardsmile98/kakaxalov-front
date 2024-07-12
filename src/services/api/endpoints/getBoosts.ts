import { gameSettings } from 'constants/index';
import { formatNumber } from 'helpers/index';
import tagTypes from '../tagTypes';

enum BoostSlugs {
  magnit = 'magnit',
  energy = 'energy',
}

interface Boost {
  allCount: number
  availableCount: number
  boostId: number
  canImproved: boolean
  description: string
  improveTitle: string
  id: number
  type: 'default' | 'daily'
  useTimestamp: null | string
  recoverySeconds: number
  level: number
  basePrice: number
  upgradePrice: number
  maxLevel: number
  slug: string
  title: string
  userId: string
}

interface BoostsResponse {
  boosts: Boost[]
  success: boolean
}

const formatDescription = (description: string, slug: string) => {
  switch (slug) {
    case 'magnit': {
      return description
        .replace(/{duration}/g, String(gameSettings.DURATION_BOOST_MAGNIT));
    }
    default:
      return description;
  }
};

const transformBoosts = (response: BoostsResponse) => ({
  improveList: response.boosts
    .filter((boost) => boost.canImproved)
    .map((boost) => ({
      id: boost.id,
      slug: boost.slug,
      title: boost.improveTitle,
      description: `${formatNumber(boost.upgradePrice)} KKXP`,
      extra: `${boost.level !== boost.maxLevel ? boost.level + 1 : 'MAX'} LVL`,
      disabled: boost.maxLevel === boost.level,
      upgradePrice: boost.upgradePrice,
    })),
  dailyList: response.boosts
    .filter((boost) => boost.type === 'daily')
    .map((boost) => ({
      id: boost.id,
      slug: boost.slug,
      title: boost.title,
      description: formatDescription(boost.description, boost.slug),
      disabled: boost.availableCount === 0,
      availableCount: boost.availableCount,
      useTimestamp: boost.useTimestamp,
      recoverySeconds: boost.recoverySeconds,
    })),
});

const getBoosts = {
  query: () => '/api/boosts',

  transformResponse: transformBoosts,

  providesTags: [tagTypes.boosts],
};

type Boosts = ReturnType<typeof transformBoosts>;

export {
  BoostSlugs,
  type Boosts,
  getBoosts,
};

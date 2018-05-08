const { expect } = require('chai')
const request = require('request')
const nock = require('nock')

describe('server', () => {

  const baseUrl = 'https://na1.api.riotgames.com'

  describe('GET/search?name', () => {
    beforeEach(() => {
      const getSummonerUrl = '/lol/summoner/v3/summoners/by-name/'
      nock(baseUrl)
        .get(getSummonerUrl + 'obesegoldfish')
        .query({api_key: process.env.API_KEY})
        .reply(200, {
          profileIconId: 578,
          name: 'ObeseGoldfish',
          summonerLevel: 52,
          accountId: 202145676,
          id: 39202711,
          revisionDate: 1525137368000
        })
    })
    it('Searches for a summoner', (done) => {
      request('http://localhost:3000/search?name=obesegoldfish', { json: true }, (err, response, body) => {
        expect(err).to.equal(null)
        expect(body).to.be.an('object').that.has.all.keys('profileIconId', 'name', 'summonerLevel', 'accountId', 'id', 'revisionDate')
        done()
      })
    })
  })
  describe('GET/icon?id', () => {
    beforeEach(() => {
      const getIconUrl = '/lol/static-data/v3/profile-icons'
      nock(baseUrl)
        .get(getIconUrl)
        .query({api_key: process.env.API_KEY})
        .reply(200, {
          data: {
            0: {
              id: 0,
              image: {
                full: '0.png',
                group: 'profileicon',
                sprite: 'profileicon0.png',
                h: 48,
                w: 48,
                y: 0,
                x: 0
              }
            }
          }
        })
    })
    it('Searches for an icon', (done) => {
      request('http://localhost:3000/icon?id=0', { json: true }, (err, response, body) => {
        expect(err).to.equal(null)
        expect(body).to.be.an('object')
        done()
      })
    })
  })
  describe('GET/rank?id', () => {
    beforeEach(() => {
      const getRankUrl = '/lol/league/v3/positions/by-summoner/'
      nock(baseUrl)
        .get(getRankUrl + '39202711')
        .query({api_key: process.env.API_KEY})
        .reply(200, [
          {
            queueType: 'RANKED_SOLO_5x5',
            hotStreak: false,
            wins: 42,
            veteran: false,
            losses: 36,
            playerOrTeamId: 39202711,
            leagueName: 'Tarics Mercenaries',
            playerOrTeamName: 'ObeseGoldfish',
            inactive: false,
            rank: 'IV',
            freshBlood: false,
            leagueId: '53ef25d0-15d1-11e8-b4cc-c81f66cf2333',
            tier: 'GOLD',
            leaguePoints: 8
          }
        ])
    })
    it('Searches for a summoners rank', (done) => {
      request('http://localhost:3000/rank?id=39202711', { json: true }, (err, response, body) => {
        expect(err).to.equal(null)
        expect(body).to.be.an('array')
        done()
      })
    })
  })
  describe('GET/matches?id', () => {
    beforeEach(() => {
      const getMatchesUrl = '/lol/match/v3/matchlists/by-account/'
      nock(baseUrl)
        .get(getMatchesUrl + '202145676')
        .query({api_key: process.env.API_KEY})
        .reply(200, {
          endIndex: 100,
          startIndex: 0,
          totalGames: 187,
          matches: [
            {
              lane: 'MID',
              gameID: 2776061160,
              champion: 105,
              platformId: 'NA1',
              timestamp: 1525395409776,
              queue: 420,
              role: 'SOLO',
              season: 11
            }
          ]
        })
    })
    it('Searches for a summoners match history', (done) => {
      request('http://localhost:3000/matches?id=202145676', { json: true }, (err, response, body) => {
        expect(err).to.equal(null)
        expect(body).to.be.an('object').that.has.all.keys('endIndex', 'startIndex', 'totalGames', 'matches')
        done()
      })
    })
  })
  describe('GET/match?id', () => {
    beforeEach(() => {
      const getMatchUrl = '/lol/match/v3/matches/'
      nock(baseUrl)
        .get(getMatchUrl + '2776061160')
        .query({api_key: process.env.API_KEY})
        .reply(200, {
          seasonId: 11,
          queueId: 420,
          gameId: 2776061160,
          participantIdentities: [
            {
              player: {
                currentPlatformId: 'NA1',
                summonerName: 'MoreLifeWasted',
                matchHistoryUri: '/v1/stats/player_history/NA1/210311803',
                platformId: 'NA1',
                currentAccountId: 210311803,
                profileIcon: 23,
                summonerId: 47512633,
                accountId: 210311803
              },
              participantId: 1
            }
          ],
          participants: [
            {
              stats: {
                goldEarned: '11305'
              }
            }
          ]
        })
    })
    it('Searches for a summoners single match', (done) => {
      request('http://localhost:3000/match?id=2776061160', { json: true }, (err, response, body) => {
        expect(err).to.equal(null)
        expect(body).to.be.an('object').that.has.all.keys('seasonId', 'queueId', 'gameId', 'participantIdentities', 'participants')
        done()
      })
    })
  })
})

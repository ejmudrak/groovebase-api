import { AuthenticationRequest } from '@feathersjs/authentication'
import { OAuthStrategy, OAuthProfile } from '@feathersjs/authentication-oauth'
import { Params, Query } from '@feathersjs/feathers'
import axios from 'axios'

export default class GoogleStrategy extends OAuthStrategy {
  async getProfile(authResult: AuthenticationRequest, _params: Params) {
    // This is the OAuth access token that can be used
    // for Google API requests as the Bearer token
    const accessToken = authResult.accessToken

    const { data } = await axios.get('https://www.googleapis.com/userinfo/v2/me', {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    })

    return data
  }

  /**
   * Merge incoming OAuth user profiles with existing user records / objects
   *
   * @param profile The user's OAuth profile
   * @returns The new user record / object after being merged with the OAuth profile
   */
  async getEntityData(profile: OAuthProfile, existing: any, params: Params) {
    // this will set 'googleId'
    const baseData = await super.getEntityData(profile, existing, params)

    // this will grab the picture and email address of the Google profile
    return {
      ...baseData,
      profilePicture: profile?.picture,
      email: profile?.email
    }
  }
}

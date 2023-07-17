import { AuthenticationRequest } from '@feathersjs/authentication'
import { OAuthStrategy, OAuthProfile } from '@feathersjs/authentication-oauth'
import { Params } from '@feathersjs/feathers'
import axios from 'axios'

export default class GoogleStrategy extends OAuthStrategy {
  /**
   * Reach out to Google to get profile data for this entity.
   * Feathers should handle this for us, but it appears to be returning undefined profile data
   *
   * @param authResult the result of Google's auth request, containing an access token
   * @returns The Google OAuth profile
   */
  async getProfile(authResult: AuthenticationRequest) {
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

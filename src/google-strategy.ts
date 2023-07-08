import { OAuthStrategy, OAuthProfile } from '@feathersjs/authentication-oauth'

export default class GoogleStrategy extends OAuthStrategy {
  /**
   * Merge incoming OAuth user profiles with existing user records / objects
   *
   * @param profile The user's OAuth profile
   * @returns The new user record / object after being merged with the OAuth profile
   */
  async getEntityData(profile: OAuthProfile) {
    // this will set 'googleId'
    const baseData = await super.getEntityData(profile, {}, {})

    // this will grab the picture and email address of the Google profile
    return {
      ...baseData,
      profilePicture: profile.picture,
      email: profile.email
    }
  }
}

// For more information about this file see https://dove.feathersjs.com/guides/cli/typescript.html
import { HookContext as FeathersHookContext, NextFunction } from '@feathersjs/feathers'
import { Application as FeathersApplication } from '@feathersjs/koa'
import { ApplicationConfiguration } from './configuration'

import { User } from './services/users/users'

export { NextFunction }

// The types for app.get(name) and app.set(name)
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Configuration extends ApplicationConfiguration {}

// A mapping of service names to types. Will be extended in service files.
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ServiceTypes {}

// The application instance type that will be used everywhere else
export type Application = FeathersApplication<ServiceTypes, Configuration>

// The context for hook functions - can be typed with a service class
export type HookContext<S = any> = FeathersHookContext<Application, S>

// Add the user as an optional property to all params
declare module '@feathersjs/feathers' {
  interface Params {
    user?: User
  }
}

export type ArtistResult = {
  id: number
  name: string
}

export type DiscogsCollectionResult = {
  basic_information: {
    artists: ArtistResult[]
    cover_image: string
    genres: string[]
    master_id: number
    styles: string[]
    thumb: string
    title: string
    year: string
  }
}

export type DiscogsSearchResult = {
  cover_image: string
  genre: string[]
  master_id: number
  style: string[]
  thumb: string
  title: string
  year: string
}

export type DiscogsTrack = {
  duration: string
  position: string
  type_: 'track'
  title: string
  extraartists: ArtistResult[]
}

export type DiscogsMasterResult = {
  id: number
  styles: string[]
  genres: string[]
  videos: any[]
  title: string
  year: string
  artists: ArtistResult[]
  tracklist: DiscogsTrack[]
}

// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import assert from 'assert'
import { app } from '../../../src/app'

describe('track-featured-artists service', () => {
  it('registered the service', () => {
    const service = app.service('track-featured-artists')

    assert.ok(service, 'Registered the service')
  })
})

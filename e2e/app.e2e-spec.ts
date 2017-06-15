import { AngularStarterProjectPage } from './app.po';

describe('angular-starter-project App', () => {
  let page: AngularStarterProjectPage;

  beforeEach(() => {
    page = new AngularStarterProjectPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});

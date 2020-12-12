import { OpenDoorKeyWordMatcher } from '../index';

describe('OpenDoorKeyWordMatcher tests', () => {
  describe('isOpenDoorMessage tests', () => {
    it('returns false for empty message', () => {
      expect(OpenDoorKeyWordMatcher.isOpenDoorMessage('')).toEqual(false);
    });
    it('returns false for some random message', () => {
      expect(OpenDoorKeyWordMatcher.isOpenDoorMessage(Math.random().toString())).toEqual(false);
    });
    it('returns true for message variant 1', () => {
      expect(
        OpenDoorKeyWordMatcher.isOpenDoorMessage(
          'Проблема) пока интернета нет, даже офис через приложение не открыть, может кто то дверь открыть, я ключ забыл',
        ),
      ).toEqual(true);
    });
    it('returns true for message variant 2', () => {
      expect(OpenDoorKeyWordMatcher.isOpenDoorMessage('Откройте дверь пжлст')).toEqual(true);
    });
    it('returns true for message variant 3', () => {
      expect(OpenDoorKeyWordMatcher.isOpenDoorMessage('Кто в офисе, откройте, пожалуйста, дверь)')).toEqual(true);
    });
    it('returns true for message variant 4', () => {
      expect(OpenDoorKeyWordMatcher.isOpenDoorMessage('Кто в офисе, откройте дверь, пожалуйста)')).toEqual(true);
    });
    it('returns true for message variant 5', () => {
      expect(OpenDoorKeyWordMatcher.isOpenDoorMessage('Ребята, откройте дверь. Там электрик подошёл')).toEqual(true);
    });
    it('returns true for message variant 6', () => {
      expect(OpenDoorKeyWordMatcher.isOpenDoorMessage('Кто рядом с дверью, откройте, пожалуйста))')).toEqual(true);
    });
    it('returns true for message variant 7', () => {
      expect(OpenDoorKeyWordMatcher.isOpenDoorMessage('Кто рядом с дверью, пустите в офис))')).toEqual(true);
    });
    it('returns true for message variant 8', () => {
      expect(OpenDoorKeyWordMatcher.isOpenDoorMessage('Ребят откройте дверь пжлст')).toEqual(true);
    });
    it('returns true for message variant 9', () => {
      expect(OpenDoorKeyWordMatcher.isOpenDoorMessage('Откройте, пожалуйста, дверь)')).toEqual(true);
    });
    it('returns true for message variant 10', () => {
      expect(OpenDoorKeyWordMatcher.isOpenDoorMessage('Откройте пожалуйста дверь, ключи забыл')).toEqual(true);
    });
    it('returns true for message variant 11', () => {
      expect(OpenDoorKeyWordMatcher.isOpenDoorMessage('Откройте дверь новенькому')).toEqual(true);
    });
    it('returns true for message variant 12', () => {
      expect(OpenDoorKeyWordMatcher.isOpenDoorMessage('Откройте дверь курьеру')).toEqual(true);
    });
    it('returns true for message variant 13', () => {
      expect(OpenDoorKeyWordMatcher.isOpenDoorMessage('Откройте дверь')).toEqual(true);
    });
    it('returns true for message variant 14', () => {
      expect(OpenDoorKeyWordMatcher.isOpenDoorMessage('Откройте дверь, пожалуйста')).toEqual(true);
    });
    it('returns true for message variant 15', () => {
      expect(OpenDoorKeyWordMatcher.isOpenDoorMessage('Есть кто в офисе? Откройте дверь')).toEqual(true);
    });
    it('returns true for message variant 16', () => {
      expect(OpenDoorKeyWordMatcher.isOpenDoorMessage('Откройте дверь пжлста')).toEqual(true);
    });
    it('returns true for message variant 17', () => {
      expect(OpenDoorKeyWordMatcher.isOpenDoorMessage('Откройте плиз дверь кто в офисе')).toEqual(true);
    });
    it('returns true for message variant 18', () => {
      expect(OpenDoorKeyWordMatcher.isOpenDoorMessage('Кто внутри, откройте дверь пожалуйста')).toEqual(true);
    });
    it('returns true for message variant 19', () => {
      expect(OpenDoorKeyWordMatcher.isOpenDoorMessage('Откройте дверь')).toEqual(true);
    });
    it('returns true for message variant 20', () => {
      expect(OpenDoorKeyWordMatcher.isOpenDoorMessage('Есть кто в офисе? Откройте дверь')).toEqual(true);
    });
  });
});

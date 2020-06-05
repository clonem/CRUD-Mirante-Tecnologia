import { expect } from 'chai';
import { instance, mock } from 'ts-mockito';
import { UsersService } from '../../../src/users/users.service';
import { UsersController } from '../../../src/users/users.controller';

describe('UsersController', () => {
  let controller: UsersController;
  let userServiceMock: UsersService;

  beforeEach(async () => {
    userServiceMock = mock(UsersService);

    controller = new UsersController(instance(userServiceMock));
  });

  it('should be defined', () => {
    expect(controller).to.not.be.undefined;
  });
});

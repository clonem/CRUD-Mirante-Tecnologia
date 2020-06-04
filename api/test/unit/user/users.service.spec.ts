import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { anything, instance, mock, verify, when } from 'ts-mockito';

import {
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { UserTypeEnum } from '../../../src/users/enum/user-type.enum';
import { UserRepository } from '../../../src/users/repository/user.repository';
import { UsersService } from '../../../src/users/users.service';

describe('UsersService', () => {
  let service: UsersService;
  let userRepositoryMock: UserRepository;

  const userDB = {
    userID: 1,
    name: 'Mauro Catto Junior',
    email: 'email@gmail.com',
    phone: '+55 (11) 99999-9999',
    userType: UserTypeEnum.Backoffice,
    createdAt: new Date(),
  };

  const userDTO = {
    userID: 1,
    name: 'Mauro Catto Junior',
    email: 'email@gmail.com',
    phone: '+55 (11) 99999-9999',
    userType: UserTypeEnum.Backoffice,
  };

  before(() => {
    chai.use(chaiAsPromised);
  });

  beforeEach(async () => {
    userRepositoryMock = mock(UserRepository);
    service = new UsersService(instance(userRepositoryMock));
  });

  it('should be defined', () => {
    expect(service).to.not.be.undefined;
  });

  describe('findOne()', () => {
    describe('when users does not return an error', () => {
      it('successfull get one user', async () => {
        when(userRepositoryMock.findOne(anything())).thenResolve(userDB);

        const result = await service.findOne(anything());

        expect(result).to.deep.include(userDTO);
      });
    });

    describe('when users return an error', () => {
      it('throw 404 error', async () => {
        when(userRepositoryMock.findOne(anything())).thenResolve();

        expect(service.findOne(anything()))
          .to.be.rejectedWith(NotFoundException)
          .then(e => {
            expect(e.status).to.be.equal(HttpStatus.NOT_FOUND);
          });
      });

      it('throw 500 error', async () => {
        when(userRepositoryMock.findOne(anything())).thenReject(
          new InternalServerErrorException(),
        );

        expect(service.findOne(anything()))
          .to.be.rejectedWith(InternalServerErrorException)
          .then(e => {
            expect(e.status).to.be.equal(HttpStatus.INTERNAL_SERVER_ERROR);
          });
      });
    });
  });

  describe('findAll()', () => {
    describe('when users does not return an error', () => {
      it('successfull get all users', async () => {
        when(userRepositoryMock.find()).thenResolve([userDB]);

        const result = await service.findAll();

        expect(result).to.deep.include(userDTO);
      });
    });
  });

  describe('delete()', () => {
    describe('when users does not return an error', () => {
      it('successfull delete one users', async () => {
        when(userRepositoryMock.delete(anything())).thenResolve({
          affected: 1,
          raw: {},
        });

        await service.delete(anything());

        verify(userRepositoryMock.delete(anything())).once();
      });
    });

    describe('when users return an error', () => {
      it('throw 404 error', async () => {
        when(userRepositoryMock.delete(anything())).thenResolve({
          affected: 0,
          raw: {},
        });

        expect(service.delete(anything()))
          .to.be.rejectedWith(NotFoundException)
          .then(e => {
            expect(e.status).to.be.equal(HttpStatus.NOT_FOUND);
          });
      });
    });
  });

  describe('update()', () => {
    describe('when users does not return an error', () => {
      it('successfull update one users', async () => {
        when(userRepositoryMock.findOne(anything())).thenResolve(userDB);
        when(userRepositoryMock.save(anything())).thenResolve(userDB);

        await service.update(anything(), userDTO);

        verify(userRepositoryMock.findOne(anything())).once();
        verify(userRepositoryMock.save(anything())).once();
      });
    });
  });

  describe('when users return an error', () => {
    it('throw 404 error', async () => {
      when(userRepositoryMock.findOne(anything())).thenResolve();
      when(userRepositoryMock.save(anything())).thenResolve();

      expect(service.update(anything(), userDTO))
        .to.be.rejectedWith(NotFoundException)
        .then(e => {
          expect(e.status).to.be.equal(HttpStatus.NOT_FOUND);
        });

      verify(userRepositoryMock.findOne(anything())).once();
      verify(userRepositoryMock.save(anything())).never();
    });
  });
});

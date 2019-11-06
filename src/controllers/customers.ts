/* tslint:disable no-console */

import * as express from 'express';
import { Connection, FindConditions } from 'typeorm';

import { Customer } from '../entity/Customer';

const getRepository = req =>
  (req.deps.connection as Connection).getRepository(Customer);

export const create: express.RequestHandler = async (req, res) => {
  try {
    const { name, phoneNumber } = req.body;

    if (!name) {
      return res.status(400).send({ message: '`name` is required.' });
    }

    if (!phoneNumber) {
      return res.status(400).send({ message: '`phoneNumber` is required.' });
    }

    const customer = new Customer();
    customer.name = name;
    customer.phoneNumber = phoneNumber;

    await getRepository(req).save(customer);

    return res.status(201).send(customer);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
};

export const list: express.RequestHandler = async (req, res) => {
  try {
    const query: FindConditions<Customer> | undefined = req.query;
    const customers = await getRepository(req).find(query);

    return res.status(200).send(customers);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
};

export const retrieve: express.RequestHandler = async (req, res) => {
  try {
    const customer = await getRepository(req).findOne({
      id: Number(req.params.id),
    });

    if (!customer) {
      return res.status(404).send({ message: 'Customer not found.' });
    }

    return res.status(200).send(customer);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
};

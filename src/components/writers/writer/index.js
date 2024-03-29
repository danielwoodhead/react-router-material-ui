import React, { Fragment } from 'react';
import { Link, Route } from 'react-router-dom';
import { NotFound } from '../../errors';
import Text from './text';

export default ({ match: { url }, name, born, deceased, description, image, texts }) =>
  <Fragment>
    <img src={image} alt={name} style={{maxWidth: 300}}/>

    <h1>{name}</h1>
      
    <h3>
      {born} &mdash; {deceased}
    </h3>

    <p>
      {description ? description : <i>No Description</i>}
    </p>

    <ul>
      {texts.map(({ id, title }) =>
        <li>
          <Link to={`${url}/texts/${id}`}>
            {title}
          </Link>
        </li>)}
    </ul>

    <Route path={`${url}/texts/:textId`} render={
      props => {
        const text = texts.find(({ id }) => id == props.match.params.textId);

        if (!text) {
          return <NotFound />
        }

        return <Text {...text} />
      }
    } />
  </Fragment>
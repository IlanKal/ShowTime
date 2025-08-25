import React, { FC } from 'react';
import Card from '../Card/Card';
import { TitleData } from '../../types/title'; 
import './CardGrid.css';

interface CardGridProps {
    data: TitleData[];
}

const CardGrid: FC<CardGridProps> = ({data}) => {
    return(
        <div className='card-grid-container'>
            {data.length > 0 ? (
                data.map((item) => (
                    <Card key={item.id} data={item} />
                ))
            ) : (
                <p className="no-results-message">No results found.</p>
            )}
        </div>
    );
};
export default CardGrid;

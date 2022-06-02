import { Model, DataTypes, ModelAttributes } from 'sequelize';

export class Rating extends Model {
    RatingId!: number;
    order_Id!: number;
    RatingFrom!: number;
    RatingTo!: number;
    Ratings!: number;
    Comments!: string;
    RatingDate!: Date;
    OnTimeArrival!: number;
    QualityOfProduct!: number;
}

export const RatingAttributes: ModelAttributes = {
    RatingId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    order_Id: {
        allowNull: false,
        references: {
            model: 'Order',
            key: 'order_Id'
        },
        type: DataTypes.UUID
    },
    RatingFrom: {
        allowNull: false,
        references: {
            model: 'User',
            key: 'id'
        },
        type: DataTypes.UUID
    },
    RatingTo: {
        allowNull: false,
        references: {
            model: 'Product',
            key: 'product_Id'
        },
        type: DataTypes.UUID
    },
    Ratings: {
        allowNull: false,
        type: DataTypes.DECIMAL(2, 2)
    },
    Comments: {
        allowNull: true,
        type: DataTypes.STRING
    },
    RatingDate: {
        allowNull: true,
        type: DataTypes.DATE
    },
    OnTimeArrival: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    QualityOfProduct: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
    }
}
import { Model, DataTypes, ModelAttributes } from "sequelize";

export class Cart extends Model {

    cart_Id!: number;
    user_Id!: number;
    userName!: string;
    product_Id!: number;
    quantity!: number;
    price!: number;

}

export const CartAttributes: ModelAttributes = {
    cart_Id: {
        allowNull: false,
        // autoIncrement: true,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    user_Id: {
        references: {
            model: 'User',
            key: 'id'
        },
        type: DataTypes.UUID,
    },
    userName: {
        type: DataTypes.STRING
    },
    product_Id: {
        references: {
            model: 'Product',
            key: 'product_Id'
        },
        type: DataTypes.UUID,
    },
    quantity: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
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
import { Model, DataTypes, ModelAttributes } from "sequelize/types";

export class Cart extends Model {

    cart_Id!: number;
    user_Id!: number;
    userName!: string;
    // products!: [
    //     {
    //         product: { type: Object, required: true },
    //         quantity: { type: Number, required: true }
    //     }
    // ];
    product_Id!: number;
    quantity!: number;

}

export const CartAttributes: ModelAttributes = {
    cart_Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    //   userId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //       model: 'User',
    //       key: 'id',
    //       as: 'userId'
    //     }
    //   },
    userName: {
        type: DataTypes.STRING
    },
    product_Id:
    {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    // products!: [
    //     {
    //         product: { type: Object, required: true },
    //         quantity: { type: Number, required: true }
    //     }
    // ],

    createdAt: {
        allowNull: false,
        type: DataTypes.DATE
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
    }
}
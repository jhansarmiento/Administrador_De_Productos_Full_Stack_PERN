import { Router } from 'express'
import { body, param } from 'express-validator'
import { createProduct, getProductById, getProducts, updateAvailability, updateProduct } from './handlers/product'
import { handleInputErrors } from './middleware'

const router = Router()

// Routing - Crea el servidor
router.get('/', getProducts)

router.get('/:id', 
    param('id').isInt().withMessage('Not Valid ID'),
    handleInputErrors,
    getProductById
)

router.post('/', 
    //Validación
    body('name')
        .notEmpty().withMessage('Name is mandatory'),
    body('price')
        .isNumeric().withMessage("The value is not a number")
        .notEmpty().withMessage('Price is mandatory')
        .custom(value => value > 0).withMessage('Not valid value'),
    handleInputErrors,
    createProduct)

router.put('/:id', 
    body('name')
        .notEmpty().withMessage('Name is mandatory'),
    body('price')
        .isNumeric().withMessage("The value is not a number")
        .notEmpty().withMessage('Price is mandatory')
        .custom(value => value > 0).withMessage('Not valid value'),
    body('availability')
        .isBoolean().withMessage('Not valid value'),
    handleInputErrors,
    updateProduct
)

router.patch('/:id', 
    updateAvailability
)

router.delete('/', (req, res) => {
    
    res.json('Desde DELETE')
})

export default router
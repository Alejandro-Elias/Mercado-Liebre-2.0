const { name } = require('ejs');
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		// Do the magic

		return res.render('products', { products, toThousand })
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		// Do the magic

		const product = products.find(element => element.id === +req.params.id)

		return res.render('detail', { product, toThousand })
	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
		return res.render('product-create-form')
	},

	// Create -  Method to store
	store: (req, res) => {
		// Do the magic

		const { name, discount, price, description, category } = (req.body)

		const lastID = products[products.length - 1].id

		const nuevoProducto = {
			id: products.length + 1,
			name: name.trim(),
			price: +price,
			discount: +discount,
			category: category,
			description: description.trim(),
			image: "default-image.png"
		}

		products.push(nuevoProducto)

		fs.writeFileSync(productsFilePath, JSON.stringify(products), "utf-8")

		return res.redirect("/products/detail/" + nuevoProducto.id)
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic

		const product = products.find(element => element.id === +req.params.id)


		return res.render('product-edit-form', { product })
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic

		const { name, price, discount, description, category } = req.body

		const productoEditado = products.map(product => {
			if (product.id === +req.params.id) {

				product.name = name.trim(),
					product.price = +price,
					product.discount = discount,
					product.category = category,
					product.description = description.trim()

			}
			return product
		})

		fs.writeFileSync(productsFilePath, JSON.stringify(productoEditado), "utf-8")

		return res.redirect("/products/detail/" + req.params.id)

	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {
		// Do the magic

		const { id } = req.params;

		const productoFiltrado = products.filter(producto => producto.id != id)

		fs.writeFileSync(productsFilePath, JSON.stringify(productoFiltrado), "utf-8")

		return res.redirect('/products')
	}
};

module.exports = controller;
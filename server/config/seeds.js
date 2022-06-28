const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Shoes' },
    { name: 'Accessories' },
    { name: 'Tops' },
    { name: 'Sports' },
    { name: 'Headwear' }
  ]);

  console.log('categories seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      username: "Eholt",
      name: 'Nikes',
      description:
        'Hardly worn shoes',
      image: "http://res.cloudinary.com/rentafit/image/upload/v1656356645/your_folder_name/btahpz0a5uhk4dnlyxev.jpg",
      category: categories[0]._id,
      price: 2.99,
      quantity: 500
    },
    {
      username: "Eholt",
      name: 'Air Force Nikes',
      description:
        'Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis. Donec iaculis rutrum vulputate. Suspendisse lectus sem, vulputate ac lectus sed, placerat consequat dui.',
      image: 'http://res.cloudinary.com/rentafit/image/upload/v1656372463/your_folder_name/kpg5vbibrjd4wxjstznb.jpg',
      category: categories[0]._id,
      price: 1.99,
      quantity: 500
    },
    {
      username: "Eholt",
      name: 'Bracelet 10k gold',
      category: categories[1]._id,
      description:
        'Donec volutpat erat erat, sit amet gravida justo sodales in. Phasellus tempus euismod urna. Proin ultrices nisi ut ipsum congue, vitae porttitor libero suscipit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam lacinia a nisi non congue.',
      image: 'http://res.cloudinary.com/rentafit/image/upload/v1656372714/your_folder_name/ptvtzqtqkn4jklpyljqr.jpg',
      price: 7.99,
      quantity: 20
    },
    {
      username: "Eholt",
      name: 'ray bans',
      category: categories[1]._id,
      description:
        'Praesent placerat, odio vel euismod venenatis, lectus arcu laoreet felis, et fringilla sapien turpis vestibulum nisl.',
      image: 'http://res.cloudinary.com/rentafit/image/upload/v1656372743/your_folder_name/jyu5iyoxp4pftkypildu.jpg',
      price: 3.99,
      quantity: 50
    },
    {

      username: "Eholt",
      name: 'renting out my hat',
      category: categories[1]._id,
      description:
        'Vivamus ut turpis in purus pretium mollis. Donec turpis odio, semper vel interdum ut, vulputate at ex. Duis dignissim nisi vel tortor imperdiet finibus. Aenean aliquam sagittis rutrum.',
      image: 'http://res.cloudinary.com/rentafit/image/upload/v1656373349/your_folder_name/vmbqbadcspys9klcxgol.jpg',
      price: 2.99,
      quantity: 100
    },
    {
      username: "Eholt",
      name: 'hardly worn top',
      category: categories[2]._id,
      description:
        'Vestibulum risus metus, luctus non tortor quis, tincidunt consectetur ex. Nullam vitae lobortis ligula, ut sagittis massa. Curabitur consectetur, tellus at pulvinar venenatis, erat augue cursus erat, eu ullamcorper eros lectus ultrices ipsum. Integer rutrum, augue vitae auctor venenatis, turpis turpis elementum orci, at sagittis risus mi a leo.',
      image: 'http://res.cloudinary.com/rentafit/image/upload/v1656372880/your_folder_name/rch8zykai5akvuxdyz9g.webp',
      price: 399.99,
      quantity: 30
    },
    {
      username: "Eholt",
      name: 'node.js t-shirt',
      category: categories[2]._id,
      description:
        'In sodales, ipsum quis ultricies porttitor, tellus urna aliquam arcu, eget venenatis purus ligula ut nisi. Fusce ut felis dolor. Mauris justo ante, aliquet non tempus in, tempus ac lorem. Aliquam lacinia dolor eu sem eleifend ultrices. Etiam mattis metus metus. Sed ligula dui, placerat non turpis vitae, suscipit volutpat elit. Phasellus sagittis, diam elementum suscipit fringilla, libero mauris scelerisque ex, ac interdum diam erat non sapien.',
      image: 'http://res.cloudinary.com/rentafit/image/upload/v1656372958/your_folder_name/fwazbuzqfsskanwig4t2.jpg',
      price: 199.99,
      quantity: 30
    },
    {
      username: "Eholt",
      name: 'never worn gymshark set',
      category: categories[3]._id,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare diam quis eleifend rutrum. Aliquam nulla est, volutpat non enim nec, pharetra gravida augue. Donec vitae dictum neque. Pellentesque arcu lorem, fringilla non ligula ac, tristique bibendum erat. Ut a semper nibh. Quisque a mi et mi tempor ultricies. Maecenas eu ipsum eu enim hendrerit accumsan at euismod urna.',
      image: 'http://res.cloudinary.com/rentafit/image/upload/v1656373066/your_folder_name/wd756nscpctyji7dbkj1.jpg',
      price: 3.99,
      quantity: 100
    },
    {
      username: "Eholt",
      name: 'Nike shorts',
      category: categories[4]._id,
      description: 'Ut vulputate hendrerit nibh, a placerat elit cursus interdum.',
      image: "http://res.cloudinary.com/rentafit/image/upload/v1656374449/your_folder_name/rajwynzhkev8yi4ikrbs.avif",
      price: 1.99,
      quantity: 1000
    },
    {
      username: "Eholt",
      name: 'Dolce and Gabbana Hat',
      category: categories[4]._id,
      description:
        'Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.',
      image: 'http://res.cloudinary.com/rentafit/image/upload/v1656373349/your_folder_name/vmbqbadcspys9klcxgol.jpg',
      price: 3.99,
      quantity: 1000
    },
    {
      username: "Eholt",
      name: 'Vintage Burberry Hat',
      category: categories[4]._id,
      description:
        'Vestibulum et erat finibus erat suscipit vulputate sed vitae dui. Ut laoreet tellus sit amet justo bibendum ultrices. Donec vitae felis vestibulum, congue augue eu, finibus turpis.',
      image: 'http://res.cloudinary.com/rentafit/image/upload/v1656373665/your_folder_name/lgqzzlfghkldy5nmninf.webp',
      price: 6.99,
      quantity: 100
    },
    {
      username: "Eholt",
      name: 'Nike Blazer Mid Tops',
      category: categories[1]._id,
      description:
        'Morbi consectetur viverra urna, eu fringilla turpis faucibus sit amet. Suspendisse potenti. Donec at dui ac sapien eleifend hendrerit vel sit amet lectus.',
      image: "http://res.cloudinary.com/rentafit/image/upload/v1656373839/your_folder_name/yhl8guummnouda4tw2fs.jpg",
      price: 4.99,
      quantity: 600
    }
  ]);

  console.log('products seeded');

  await User.deleteMany();

  await User.create({
    username: "pamela",
    email: 'pamela@testmail.com',
    password: 'password12345',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    username: "Eholt",
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});

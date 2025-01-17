const { Image } = require('../models');

module.exports = {

    async popular(){
        const p_images = await Image.find()
            .limit(9)
            .sort({likes: -1});
        
        return p_images;
    }
}
package main

import (
	"batik/config"
	"batik/controller"
	"batik/middleware"
	"batik/repository"
	"batik/service"
	"batik/utils"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

var (
	db *gorm.DB = config.SetupDatabaseConnection()

	// Repo
	userRepository    repository.UserRepository    = repository.NewUserRepository(db)
	articleRepository repository.ArticleRepository = repository.NewArticleRepository(db)

	// Service
	jwtService     service.JWTService     = service.NewJWTService()
	authService    service.AuthService    = service.NewAuthServie(userRepository)
	articleService service.ArticleService = service.NewArticleService(articleRepository)

	// Controller
	authController    controller.AuthController    = controller.NewAuthController(authService, jwtService)
	articleController controller.ArticleController = controller.NewArticleController(articleService, jwtService)

)

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Credentials", "false")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Header("Access-Control-Allow-Methods", "POST,HEAD,PATCH, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func main() {
	defer config.CloseDatabaseConnection(db)
	r := gin.Default()
	r.Use(CORSMiddleware())

	authRoutes := r.Group("api")
	{
		authRoutes.POST("/login", authController.Login)
		authRoutes.POST("/register", authController.Register)
	}

	// articleRoutes := r.Group("api", middleware.AuthorizeJWT(jwtService))
	// {
	// 	// Untuk menampilkan semua data
	// 	articleRoutes.GET("/getAllArticles", articleController.GetAllArticle)
	// 	// Untuk output klasifikasi
	// 	articleRoutes.GET("/getArticleWithKey/:title", articleController.GetArticleByKey)
	// }



	articleRoutes := r.Group("api")
	{
		// Public routes
		articleRoutes.GET("/articles", articleController.GetAllArticles)
		articleRoutes.GET("/articles/:id", articleController.GetArticleByID)
		articleRoutes.GET("/articles/slug/:slug", articleController.GetArticleBySlug)
		articleRoutes.GET("/articles/search", articleController.SearchArticles)
		
		// Protected routes (require JWT authentication)
		protected := articleRoutes.Group("", middleware.AuthorizeJWT(jwtService))
		{
			protected.POST("/articles", articleController.CreateArticle)
			protected.PUT("/articles/:id", articleController.UpdateArticle)
			protected.DELETE("/articles/:id", articleController.DeleteArticle)
			protected.POST("/upload", utils.UploadImage)
		}
	}

	r.Run(":8081")
}

package usecases

import (
	"fmt"
	"myapp/internal/external"
	"myapp/internal/repositories"
	"myapp/internal/usecases"
	"testing"
)

func init() {
	external.SetupDB()
}

func setupSignInUsecase() (*usecases.SignInUsecase, func()) {
	db := external.DB.Begin()
	repo := repositories.NewUserRepository(db)
	usecase := usecases.NewSignInUsecase(repo)
	teardown := func() {
		db.Rollback()
	}
	return usecase, teardown
}

func TestSignInUsecase(t *testing.T) {
	usecase, teardown := setupSignInUsecase()
	defer teardown()

	// Valid testcases
	testcases := []struct {
		username string
		password string
	}{
		{"taro", "password"},
		{"hanako", "PASSWORD"},
	}
	for _, tc := range testcases {
		t.Run(fmt.Sprintf("username = %s can signin", tc.password), func(t *testing.T) {
			result, err := usecase.Execute(tc.username, tc.password)
			if err != nil {
				t.Errorf("Usecase returns error: %v", err.Error())
			}
			if result == nil {
				t.Error("Nil")
			} else if result.User.Name != tc.username {
				t.Errorf("Wrong user: %+v", result.User.Name)
			}
		})
	}
}

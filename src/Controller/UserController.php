<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\UserType;
use App\Repository\UserRepository;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

#[Route('/user')]
class UserController extends AbstractController
{
    #[Route('/Users', name: 'app_user_indSex', methods: ['GET'])]
    public function index(UserRepository $userRepository, SerializerInterface $serializer): Response
    {
        try {
            $data = $userRepository->findAll();
            $response = $serializer->serialize($data, 'json');
            return new JsonResponse($response, 200, [], true);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    

    #[Route('/new', name: 'app_user_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
    try {
        $user = new User();
        $data = json_decode($request->getContent(), true);
        $user->setUsername($data['username']);
        $user->setEmail($data['email']);
        $user->setPassword($data['password']);
        $user->setNumero($data['numero']);
        $entityManager->persist($user);
        $entityManager->flush();
        return new JsonResponse(['status' => 'User created'], Response::HTTP_CREATED);
    } catch (\Exception $e) {
        return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}

#[Route('/{id}', name: 'app_user_show', methods: ['GET'])]
public function show($id, UserRepository $userRepository, SerializerInterface $serializer): Response
{
    try {
        $user = $userRepository->find($id);
        if ($user === null) {
            throw new \Exception('User not found');
        }
        $response = $serializer->serialize($user, 'json');
        return new JsonResponse($response, 200, [], true);
    } catch (\Exception $e) {
        return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}

    #[Route('/email/{email}', name: 'app_user_get_by_email', methods: ['GET'])]
    public function getUserByEmail(string $email, UserRepository $userRepository, SerializerInterface $serializer): Response
    {
        try {
            $user = $userRepository->findByEmail($email);

            if ($user === null) {
                return new JsonResponse(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
            }

            $response = $serializer->serialize($user, 'json', ['groups' => 'command']);
            return new JsonResponse($response, Response::HTTP_OK, [], true);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

#[Route('/{id}/edit', name: 'app_user_edit', methods: ['PUT'])]
public function edit(Request $request, User $user, EntityManagerInterface $entityManager): Response
{
    try {
        $data = json_decode($request->getContent(), true);
        $user->setUsername($data['username']);
        $user->setEmail($data['email']);
        $user->setPassword($data['password']);
        $user->setNumero($data['numero']);
        $entityManager->flush();
        return new JsonResponse(['status' => 'User updated'], Response::HTTP_OK);
    } catch (\Exception $e) {
        return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}

#[Route('/{id}', name: 'app_user_delete', methods: ['DELETE'])]
public function delete($id, UserRepository $userRepository, EntityManagerInterface $entityManager): Response
{
    try {
        $user = $userRepository->find($id);
        if ($user === null) {
            throw new \Exception('User not found');
        }
        $entityManager->remove($user);
        $entityManager->flush();
        return new JsonResponse(['status' => 'User deleted'], Response::HTTP_NO_CONTENT);
    } catch (\Exception $e) {
        return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}
}
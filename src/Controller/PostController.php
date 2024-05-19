<?php

namespace App\Controller;

use App\Entity\Post;
use App\Form\PostType;
use App\Repository\PostRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use App\Entity\User; 
use App\Repository\UserRepository;

#[Route('/post')]
class PostController extends AbstractController
{
    #[Route('/posts', name: 'app_post_index', methods: ['GET'])]
    public function index(PostRepository $postRepository, SerializerInterface $serializer): Response
    {
        try {
            $data = $postRepository->findAll();
            $response = $serializer->serialize($data, 'json');
            return new JsonResponse($response, 200, [], true);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/new', name: 'app_post_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager, UserRepository $userRepository): Response
    {
        try {
            $post = new Post();
            $data = json_decode($request->getContent(), true);
            $post->setImageURL($data['imageURL']);
            $post->setDescription($data['description']);
            $post->setLikes($data['likes'] ?? 0);
            try {
                $post->setAddedAt(new \DateTimeImmutable($data['addedAt']));
            } catch (\Exception $e) {
                return new JsonResponse(['error' => 'Invalid date format for addedAt'], Response::HTTP_BAD_REQUEST);
            }
            // Get the user by its id
            $user = $userRepository->find($data['userId']);
            $post->setUser($user);
            $entityManager->persist($post);
            $entityManager->flush();
            return new JsonResponse(['status' => 'Post created'], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/{id}', name: 'app_post_show', methods: ['GET'])]
    public function show($id, PostRepository $postRepository, SerializerInterface $serializer): Response
    {
        try {
            $post = $postRepository->find($id);
            if ($post === null) {
                throw new \Exception('Post not found');
            }
            $response = $serializer->serialize($post, 'json');
            return new JsonResponse($response, 200, [], true);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

   #[Route('/{id}/edit', name: 'app_post_edit', methods: ['PUT'])]
public function edit(Request $request, Post $post, EntityManagerInterface $entityManager, UserRepository $userRepository): Response
{
    try {
        $data = json_decode($request->getContent(), true);
        $post->setImageURL($data['imageURL']);
        $post->setDescription($data['description']);
        $post->setLikes($data['likes'] ?? 0);
        $post->setAddedAt(new \DateTimeImmutable());
        // Get the user by its id
        $user = $userRepository->find($data['userId']);
        $post->setUser($user);
        $entityManager->flush();
        return new JsonResponse(['status' => 'Post updated'], Response::HTTP_OK);
    } catch (\Exception $e) {
        return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}

    #[Route('/{id}', name: 'app_post_delete', methods: ['DELETE'])]
    public function delete($id, PostRepository $postRepository, EntityManagerInterface $entityManager): Response
    {
        try {
            $post = $postRepository->find($id);
            if ($post === null) {
                throw new \Exception('Post not found');
            }
            $entityManager->remove($post);
            $entityManager->flush();
            return new JsonResponse(['status' => 'Post deleted'], Response::HTTP_NO_CONTENT);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
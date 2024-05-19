<?php

namespace App\Controller;

use App\Entity\Comment;
use App\Form\CommentType;
use App\Repository\CommentRepository;
use App\Repository\UserRepository;
use App\Repository\PostRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;


#[Route('/comment')]
class CommentController extends AbstractController
{
    #[Route('/comments', name: 'app_comment_index', methods: ['GET'])]
    public function index(CommentRepository $commentRepository, SerializerInterface $serializer): Response
    {
        try {
            $data = $commentRepository->findAll();
            $response = $serializer->serialize($data, 'json', ['groups' => ['comment', 'user']]);

            return new JsonResponse($response, 200, [], true);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

       #[Route('/new', name: 'app_comment_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager, UserRepository $userRepository, PostRepository $postRepository): Response
    {
        try {
            $comment = new Comment();
            $data = json_decode($request->getContent(), true);
            $comment->setContent($data['content']);
            // Get the user by its id
            $user = $userRepository->find($data['userId']);
            $comment->setUser($user);
            // Get the post by its id
            $post = $postRepository->find($data['postId']);
            $comment->setPost($post);
            $entityManager->persist($comment);
            $entityManager->flush();
            return new JsonResponse(['status' => 'Comment created'], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/{id}', name: 'app_comment_show', methods: ['GET'])]
    public function show($id, CommentRepository $commentRepository, SerializerInterface $serializer): Response
    {
        try {
            $comment = $commentRepository->find($id);
            if ($comment === null) {
                throw new \Exception('Comment not found');
            }
            $response = $serializer->serialize($comment, 'json', ['groups' => ['comment', 'user']]);

            return new JsonResponse($response, 200, [], true);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/{id}/edit', name: 'app_comment_edit', methods: ['PUT'])]
    public function edit(Request $request, Comment $comment, EntityManagerInterface $entityManager, UserRepository $userRepository, PostRepository $postRepository): Response
    {
        try {
            $data = json_decode($request->getContent(), true);
            $comment->setContent($data['content']);
            // Get the user by its id
            $user = $userRepository->find($data['userId']);
            $comment->setUser($user);
            // Get the post by its id
            $post = $postRepository->find($data['postId']);
            $comment->setPost($post);
            $entityManager->flush();
            return new JsonResponse(['status' => 'Comment updated'], Response::HTTP_OK);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/{id}', name: 'app_comment_delete', methods: ['DELETE'])]
    public function delete($id, CommentRepository $commentRepository, EntityManagerInterface $entityManager): Response
    {
    try {
    $comment = $commentRepository->find($id);
    if ($comment === null) {
    throw new \Exception('Comment not found');
    }
    $entityManager->remove($comment);
    $entityManager->flush();
    return new JsonResponse(['status' => 'Comment deleted'], Response::HTTP_NO_CONTENT);
    } catch (\Exception $e) {
    return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
    }

    #[Route('', name: 'app_comment_by_post', methods: ['GET'])]
    public function getCommentByPostId($postId, CommentRepository $commentRepository, SerializerInterface $serializer): Response
    {
        try {
            $comments = $commentRepository->findByPostId($postId);
            if ($comments === null) {
                throw new \Exception('No comments found for this post');
            }
            $response = $serializer->serialize($comments, 'json');
            return new JsonResponse($response, 200, [], true);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
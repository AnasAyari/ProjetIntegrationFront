<?php

namespace App\Controller;

use App\Entity\Poster;
use App\Form\PosterType;
use App\Repository\PosterRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/poster')]
class PosterController extends AbstractController
{
    #[Route('/posters', name: 'app_poster_index', methods: ['GET'])]
    public function index(PosterRepository $posterRepository, SerializerInterface $serializer): Response
    {
        try {
            $data = $posterRepository->findAll();
            $response = $serializer->serialize($data, 'json');
            return new JsonResponse($response, 200, [], true);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/new', name: 'app_poster_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        try {
            $poster = new Poster();
            $data = json_decode($request->getContent(), true);
            $poster->setArtist($data['artist']);
            $poster->setAlbum($data['album']);
            $poster->setQuantity($data['quantity']);
            $poster->setAddedAt(new \DateTimeImmutable());
            $poster->setUpdatedAt(new \DateTimeImmutable());
            $entityManager->persist($poster);
            $entityManager->flush();
            return new JsonResponse(['status' => 'Poster created'], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/{id}', name: 'app_poster_show', methods: ['GET'])]
    public function show($id, PosterRepository $posterRepository, SerializerInterface $serializer): Response
    {
        try {
            $poster = $posterRepository->find($id);
            if ($poster === null) {
                throw new \Exception('Poster not found');
            }
            $response = $serializer->serialize($poster, 'json');
            return new JsonResponse($response, 200, [], true);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/{id}/edit', name: 'app_poster_edit', methods: ['PUT'])]
    public function edit(Request $request, Poster $poster, EntityManagerInterface $entityManager): Response
    {
        try {
            $data = json_decode($request->getContent(), true);
            $poster->setArtist($data['artist']);
            $poster->setAlbum($data['album']);
            $poster->setQuantity($data['quantity']);
            $poster->setUpdatedAt(new \DateTimeImmutable());
            $entityManager->flush();
            return new JsonResponse(['status' => 'Poster updated'], Response::HTTP_OK);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/{id}', name: 'app_poster_delete', methods: ['DELETE'])]
    public function delete($id, PosterRepository $posterRepository, EntityManagerInterface $entityManager): Response
    {
        try {
            $poster = $posterRepository->find($id);
            if ($poster === null) {
                throw new \Exception('Poster not found');
            }
            $entityManager->remove($poster);
            $entityManager->flush();
            return new JsonResponse(['status' => 'Poster deleted'], Response::HTTP_NO_CONTENT);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
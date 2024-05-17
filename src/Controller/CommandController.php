<?php

namespace App\Controller;

use App\Entity\Command;
use App\Form\CommandType;
use App\Repository\CommandRepository;
use App\Repository\UserRepository;
use App\Repository\PosterRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/command')]
class CommandController extends AbstractController
{
    #[Route('/commands', name: 'app_command_index', methods: ['GET'])]
   public function index(CommandRepository $commandRepository, SerializerInterface $serializer): Response
    {
        try {
            $data = $commandRepository->findAll();
            $response = $serializer->serialize($data, 'json', ['groups' => 'command']);
            return new JsonResponse($response, 200, [], true);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

   #[Route('/new', name: 'app_command_new', methods: ['POST'])]
public function new(Request $request, EntityManagerInterface $entityManager, UserRepository $userRepository, PosterRepository $posterRepository): Response
{
    try {
        $command = new Command();
        $data = json_decode($request->getContent(), true);
        $command->setLocation($data['location']);
        // Get the user and poster by their ids
        $user = $userRepository->find($data['userId']);
        $poster = $posterRepository->find($data['posterId']);
        $command->setUser($user);
        $command->addPoster($poster); // Use addPoster instead of setPoster
        $entityManager->persist($command);
        $entityManager->flush();
        return new JsonResponse(['status' => 'Command created'], Response::HTTP_CREATED);
    } catch (\Exception $e) {
        return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}

    #[Route('/{id}', name: 'app_command_show', methods: ['GET'])]
    public function show($id, CommandRepository $commandRepository, SerializerInterface $serializer): Response
    {
        try {
            $command = $commandRepository->find($id);
            if ($command === null) {
                throw new \Exception('Command not found');
            }
            $response = $serializer->serialize($command, 'json');
            return new JsonResponse($response, 200, [], true);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/{id}/edit', name: 'app_command_edit', methods: ['PUT'])]
public function edit(Request $request, Command $command, EntityManagerInterface $entityManager, UserRepository $userRepository, PosterRepository $posterRepository): Response
{
    try {
        $data = json_decode($request->getContent(), true);
        $command->setLocation($data['location']);
        // Get the user and poster by their ids
        $user = $userRepository->find($data['userId']);
        $poster = $posterRepository->find($data['posterId']);
        $command->setUser($user);
        $command->addPoster($poster); // Use addPoster instead of setPoster
        $entityManager->flush();
        return new JsonResponse(['status' => 'Command updated'], Response::HTTP_OK);
    } catch (\Exception $e) {
        return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}

    #[Route('/{id}', name: 'app_command_delete', methods: ['POST'])]
    public function delete(Request $request, Command $command, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$command->getId(), $request->request->get('_token'))) {
            $entityManager->remove($command);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_command_index', [], Response::HTTP_SEE_OTHER);
    }
}